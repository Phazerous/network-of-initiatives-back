import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
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
    ApiCookieAuth()
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
