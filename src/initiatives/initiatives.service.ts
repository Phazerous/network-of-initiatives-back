import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InitiativesService {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}

  async getInitiativesShort() {
    const initiatives = await this.prisma.initiative.findMany({
      select: {
        id: true,
        description: true,
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
}
