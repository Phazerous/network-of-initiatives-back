import { Controller, Get, Param } from '@nestjs/common';
import { InitiativesService } from './initiatives.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResponseInitiativesShortDto } from 'src/dtos/response-initiatives-short.dto';
import { ResponseInitiativeShortDto } from 'src/dtos/response-initiative-short.dto';
import { ResponseNotFoundDto } from 'src/dtos/response-not-found.dto';
import { ResponseGetInitiativeDto } from 'src/dtos/response-get-initiative.dto';

@Controller('initiatives')
export class InitiativesController {
  constructor(private initiativeService: InitiativesService) {}

  //#region getInitiatives
  @Get()
  @ApiOperation({ description: 'Retrieves the short of initiatives' })
  @ApiOkResponse({
    description: 'Succesful response',
    type: ResponseInitiativesShortDto,
    isArray: true,
  })
  async getInitiatives() {
    return await this.initiativeService.getInitiativesShort();
  }
  //#endregion
  //#region getInitiativeShortById
  @Get(':initiativeId/short')
  @ApiOperation({
    description: 'Retrieves the short form of the provided initiative.',
  })
  @ApiOkResponse({
    description: 'Succesfull response',
    type: ResponseInitiativeShortDto,
  })
  @ApiNotFoundResponse({ description: 'Not found', type: ResponseNotFoundDto })
  async getInitiativeShortById(@Param('initiativeId') initiativeId: string) {
    return await this.initiativeService.getInitiativeShortById(initiativeId);
  }
  //#endregion
  //#region getInitiativeById
  @Get(':initiativeId/full')
  @ApiOperation({
    description: 'Retrieves the full form of the provided initiative.',
  })
  @ApiOkResponse({
    description: 'Succesfull response',
    type: ResponseGetInitiativeDto,
  })
  @ApiNotFoundResponse({ description: 'Not found', type: ResponseNotFoundDto })
  async getInitiativeById(@Param('initiativeId') initiativeId: string) {
    return await this.initiativeService.getInitiativeShortById(initiativeId);
  }
  //#endregion
}
