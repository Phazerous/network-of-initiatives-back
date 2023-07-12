import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateInitiativeDto } from 'src/dtos/create-initiative.dto';
import { ResponseGetInitiativeDto } from 'src/dtos/response-get-initiative.dto';
import { ResponseInitiativeShortDto } from 'src/dtos/response-initiative-short.dto';
import { ResponseInitiativesShortDto } from 'src/dtos/response-initiatives-short.dto';
import { ResponseNotFoundDto } from 'src/dtos/response-not-found.dto';
import { ResponseUnauthorized } from 'src/dtos/response-unauthorized.dot';

const NotFoundResponse = () => {
  ApiNotFoundResponse({
    description: 'Not found',
    type: ResponseNotFoundDto,
  });
};

const UnauthorizedResponse = () => {
  ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: ResponseUnauthorized,
  });
};

export const DocsGetInitiatives = () => {
  return applyDecorators(
    ApiOperation({ description: 'Retrieves the short of initiatives' }),
    ApiOkResponse({
      description: 'Succesful response',
      type: ResponseInitiativesShortDto,
      isArray: true,
    }),
  );
};

export const DocsGetInitiativeShort = () => {
  return applyDecorators(
    ApiOperation({
      description: 'Retrieves the short form of the provided initiative.',
    }),
    ApiNotFoundResponse({
      description: 'Not found',
      type: ResponseNotFoundDto,
    }),
    ApiOkResponse({
      description: 'Succesfull response',
      type: ResponseInitiativeShortDto,
    }),
    NotFoundResponse,
  );
};

export const DocsGetInitiative = () => {
  return applyDecorators(
    ApiOperation({
      description: 'Retrieves the full form of the provided initiative.',
    }),
    ApiOkResponse({
      description: 'Succesfull response',
      type: ResponseGetInitiativeDto,
    }),
    NotFoundResponse,
  );
};

export const DocsCreateInitiative = () => {
  return applyDecorators(
    ApiOperation({
      description: 'Creates an initiative and if succesfully returns its id',
    }),
    ApiBody({
      type: CreateInitiativeDto,
    }),
    ApiCreatedResponse({
      description: 'Succesfully created',
      schema: {
        type: 'string',
        example: '4ed6f782-31c9-4808-a771-dd5ab32ed839',
      },
    }),
    UnauthorizedResponse,
  );
};

export const DocsCreateApplication = () => {
  return applyDecorators(
    ApiOperation({
      description:
        'Applies to an initiative, if succeed returns applicationId.',
    }),
    ApiCreatedResponse({
      description: 'Succesfully created',
      schema: {
        type: 'string',
        example: '4ed6f782-31c9-4808-a771-dd5ab32ed839',
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: ResponseUnauthorized,
    }),
    ApiNotFoundResponse({
      description: 'Not found',
      type: ResponseNotFoundDto,
    }),
    ApiConflictResponse({
      description: `Conflict`,
      content: {
        'application/json': {
          examples: {
            'Self-Application Conflict': {
              value: {
                statusCode: '409',
                message: `Not allowed to apply to your own initiative.`,
              },
            },
            'Duplication Conflict': {
              value: {
                statusCode: '409',
                message: 'Not allowed to apply to one initiative twice',
              },
            },
          },
        },
      },
    }),
  );
};

export const DocsRequestVerificationCode = () => {
  return applyDecorators(
    ApiOperation({
      description:
        'Applies to an initiative, if succeed returns applicationId.',
    }),
    ApiConflictResponse({
      description: 'Conflict',
      content: {
        'appliaction/json': {
          example: {
            statusCode: '409',
            message: 'User with the specified email already exists',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad Request.',
      content: {
        'application/json': {
          example: {
            statusCode: 400,
            message: ['email must be an email'],
            error: 'Bad Request',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Succesfully created.',
    }),
  );
};

export const DocsVerifyEmail = () => {
  return applyDecorators(
    ApiOperation({
      description:
        'Verifies email, if succeed gives a token for further registration',
    }),
    ApiNotFoundResponse({
      description: 'Not Found',
    }),
    ApiBadRequestResponse({
      description: 'Bad Request | Incorrect credentials',
    }),
    ApiCreatedResponse({
      description:
        'Registration token was successfully created and sent via REG_TOKEN cookie',
    }),
  );
};

export const DocsSignup = () => {
  return applyDecorators(
    ApiOperation({
      description: 'Signs up the user using previous gotten REG_TOKEN',
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized | REG_TOKEN was not provided',
    }),
    ApiCreatedResponse({
      description: 'Returns userID and sets the JWT to the cookie',
      schema: {
        type: 'string',
        example: 'f278g-f2f83-3f3h58-ghs86',
      },
    }),
  );
};

export const DocsLogin = () => {
  return applyDecorators(
    ApiOperation({
      description:
        'Verifies login credentials, if succeed returns JWT Token via USER_TOKEN Cookie and userID',
    }),
    ApiNotFoundResponse({
      description: 'Not Found | Incorrect data credentials',
    }),
    ApiCreatedResponse({
      description: 'Returns userID and sets the JWT to the cookie',
      schema: {
        type: 'string',
        example: 'f278g-f2f83-3f3h58-ghs86',
      },
    }),
  );
};

export const DocsUpdateUser = () => {
  return applyDecorators(
    ApiOperation({
      description: 'Updates available user fields',
    }),
    ApiForbiddenResponse({
      description: 'Not allowed to modify not your own data',
    }),
    ApiNotFoundResponse(),
  );
};
