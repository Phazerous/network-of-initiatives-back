import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import UserAuthProps from 'src/auth/user-auth.interface';
import RespondApplicationDto from 'src/dtos/respond-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(@Inject('PrismaService') private prisma: PrismaClient) {}

  async getUserApplicationsShort(requestedUserId: string, user: UserAuthProps) {
    if (!(requestedUserId === user.userId || user.isAdmin))
      throw new ForbiddenException();

    const applications = await this.prisma.application.findMany({
      where: {
        applierId: requestedUserId,
      },
      select: {
        id: true,
        initiative: {
          select: {
            title: true,
          },
        },
        status: true,
      },
    });

    return applications;
  }

  async getInitiativeApplicationsShort(
    initiativeId: string,
    user: UserAuthProps,
  ) {
    const applications = await this.prisma.application.findMany({
      where: {
        initiativeId,
      },
      select: {
        id: true,
        status: true,
        applier: {
          select: {
            name: true,
            lastname: true,
          },
        },
        initiative: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!(applications && applications.length !== 0)) return [];

    if (!(applications[0].initiative.userId === user.userId || user.isAdmin))
      throw new ForbiddenException();

    const transformedApplications = applications.map(
      ({ initiative, ...app }) => ({ ...app }),
    );

    return transformedApplications;
  }

  async getApplicationForInitiator(applicationId: string, user: UserAuthProps) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        about: true,
        applier: {
          select: {
            name: true,
            lastname: true,
            location: true,
            university: true,
            contact: true,
            about: true,
          },
        },
        initiative: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!application) throw new NotFoundException();

    if (!(application.initiative.userId === user.userId || user.isAdmin))
      throw new ForbiddenException();

    const { initiative, ...app } = application;

    return app;
  }

  async getApplicationForApplier(applicationId: string, user: UserAuthProps) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        about: true,
        status: true,
        answer: true,
        applier: {
          select: {
            id: true,
          },
        },
        initiative: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!application) throw new NotFoundException();

    if (!(application.applier.id === user.userId || user.isAdmin))
      throw new ForbiddenException();

    const { applier, ...app } = application;

    return app;
  }

  async respondToApplication(
    applicationId: string,
    user: UserAuthProps,
    respondApplicationDto: RespondApplicationDto,
  ) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        status: true,
        initiative: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!application) throw new NotFoundException();
    if (!(application.initiative.userId === user.userId || user.isAdmin))
      throw new ForbiddenException();

    if (application.status !== 0) throw new BadRequestException();

    const updatedApplication = await this.prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        ...respondApplicationDto,
      },
    });

    return;
  }
}
