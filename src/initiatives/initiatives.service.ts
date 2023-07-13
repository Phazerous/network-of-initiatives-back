import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import UserAuthProps from 'src/auth/user-auth.interface';
import CreateApplicationDto from 'src/dtos/create-application.dto';
import { CreateInitiativeDto } from 'src/dtos/create-initiative.dto';
import RespondInitiativeDto from 'src/dtos/respond-initiative-dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InitiativesService {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}

  async getInitiativesShort() {
    const initiatives = await this.prisma.initiative.findMany({
      where: {
        status: 1,
      },
      select: {
        id: true,
        title: true,
        RoleToInitiative: {
          select: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const transformedInitiatives = initiatives.map(
      ({ RoleToInitiative, ...initiative }) => ({
        ...initiative,
        roles: RoleToInitiative.map(
          (roleToInitiative) => roleToInitiative.role.name,
        ),
      }),
    );

    return transformedInitiatives;
  }

  async getInitiativeShortById(initiativeId: string) {
    const initiative = await this.prisma.initiative.findUnique({
      where: {
        id: initiativeId,
      },
      select: {
        title: true,
        description: true,
        location: true,
        university: true,
        stage: true,
        dateOfPublication: true,
        RoleToInitiative: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!initiative) throw new NotFoundException();

    const transformedInitiative = {
      ...initiative,
      roles: initiative.RoleToInitiative.map(
        (roleToInitiative) => roleToInitiative.role.name,
      ),
    };

    delete transformedInitiative.RoleToInitiative;

    return transformedInitiative;
  }

  async getInitiativeById(initiativeId: string) {
    const initiative = await this.prisma.initiative.findUnique({
      where: {
        id: initiativeId,
      },
      include: {
        RoleToInitiative: {
          select: {
            role: true,
          },
        },
      },
    });

    if (!initiative) throw new NotFoundException();

    const transformedInitiative = {
      ...initiative,
      roles: initiative.RoleToInitiative.map(
        (roleToInitiative) => roleToInitiative.role.name,
      ),
    };

    delete transformedInitiative.RoleToInitiative;

    return transformedInitiative;
  }

  async createInitiative(
    userId: string,
    createInitiativeDto: CreateInitiativeDto,
  ) {
    const initiative = await this.prisma.initiative.create({
      data: {
        ...createInitiativeDto,
        user: { connect: { id: userId } },
      },
      select: {
        id: true,
      },
    });

    return initiative.id;
  }

  async applyToInitiative(
    applierId: string,
    initiativeId: string,
    createApplicationDto: CreateApplicationDto,
  ) {
    const initiative = await this.prisma.initiative.findUnique({
      where: { id: initiativeId },
      include: {
        Application: {
          where: { id: applierId },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!initiative) throw new NotFoundException();
    if (initiative.user.id === applierId) throw new ForbiddenException();
    if (initiative.Application.length !== 0) throw new ForbiddenException();

    const application = await this.prisma.application.create({
      data: {
        ...createApplicationDto,
        initiative: { connect: { id: initiativeId } },
        applier: { connect: { id: applierId } },
      },
      select: {
        id: true,
      },
    });

    return application.id;
  }

  async getUserInitiativesShort(requestedUserId: string, user: UserAuthProps) {
    if (!(requestedUserId === user.userId || user.isAdmin))
      throw new ForbiddenException();

    const initiatives = await this.prisma.initiative.findMany({
      where: {
        userId: requestedUserId,
      },
      select: {
        id: true,
        title: true,
        status: true,
      },
    });

    return initiatives;
  }

  async getInitiativeStatus(initiativeId: string, user: UserAuthProps) {
    const record = await this.prisma.initiative.findUnique({
      where: {
        id: initiativeId,
      },
      select: {
        id: true,
        status: true,
        moderatorComment: true,
        title: true,
        userId: true,
      },
    });

    if (!(record.userId === user.userId || user.isAdmin))
      throw new ForbiddenException();

    const { userId, ...initiative } = record;

    return initiative;
  }

  async getInitiativesToModerate() {
    const initiatives = await this.prisma.initiative.findMany({
      where: {
        status: 0,
      },
      select: {
        id: true,
        title: true,
      },
    });

    return initiatives;
  }

  async respondInitiative(
    initiativeId: string,
    respondInitiativeDto: RespondInitiativeDto,
  ) {
    const initiative = await this.prisma.initiative.update({
      where: {
        id: initiativeId,
      },
      data: {
        ...respondInitiativeDto,
      },
    });

    return;
  }
}
