import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO } from './dto/Signin.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { SignupDTO } from './dto/Signup.dto';
import { AuthConfig } from 'src/auth-config/entities/auth-config.entity';
import { AuthConfigService } from 'src/auth-config/auth-config.service';
import { Request, Response } from 'express';
import { PROVIDERS } from 'src/shared/enums';
import { nanoid } from 'nanoid';
import { AuthProviderService } from './auth-provider.service';
import { ParseAuthProviderPipe } from 'src/shared/pipes/parse-auth-provider.pipe';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authProviderService: AuthProviderService,
  ) {}
  @Get('/:id/:provider')
  async authorize(
    @Param('id') id: string,
    @Param('provider', ParseAuthProviderPipe) provider: PROVIDERS,
    @Res() res: Response,
  ): Promise<void> {
    const authProvider = await this.authService.getAuthProviderConfig(+id);
    if (authProvider.provider != provider) throw new NotFoundException();

    // security mesure against forgery
    const state = nanoid(15);
    res.cookie('state', state, {
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
      signed: true,
    });

    const authorizationUrl = this.authProviderService.getAuthorizationUrl(
      state,
      authProvider,
    );

    res.redirect(authorizationUrl);
  }

  @Get('/:id/:provider/callback')
  async token(
    @Param('id') id: string,
    @Param('provider', ParseAuthProviderPipe) provider: PROVIDERS,
    @Query('code') code: string,
    @Query('state') state: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const authProvider = await this.authService.getAuthProviderConfig(+id);
    if (authProvider.provider != provider) throw new NotFoundException();

    // check if somone trying to forge a request
    if (state != req.signedCookies['state'])
      throw new UnprocessableEntityException('Invalid State');

    // clean up
    res.clearCookie('state');

    const data = await this.authProviderService.fetchToken(code, authProvider);

    let options = undefined;
    if (data.token_type && data.token_type != '') {
      options = { token_type: data.token_type };
    }

    const profile = await this.authProviderService.getProfile(
      authProvider.userInfoURL,
      data.access_token as string,
      options,
    );

    const user = await this.authService.mapProfilToUser(profile, authProvider);
    const response = await this.authService.signIn(
      { email: user.email, enterpriseCode: authProvider.enterprise.code },
      { oidcFlow: true },
    );


    // we can make save token in responce then redirect to the frontend
    // but honestly opening a window for the flow make more sence to me
    // this is kinda of a hack but it works fine
    // as long we change the * in production to the frontend url
    res.status(200).send(`
    <script>
      window.opener.postMessage(${JSON.stringify(response)}, '*');
      window.close();
    </script>
  `);
  }
  @Post('signup')
  signup(@Body() signupDTO: SignupDTO) {
    return this.authService.signUp(signupDTO);
  }

  @Post('signin')
  signIn(@Body() signinDTO: SigninDTO) {
    return this.authService.signIn(signinDTO);
  }

  @Post('forgot-password')
  @ApiBody({ type: [ForgotPasswordDto] })
  forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data);
  }

  @Post('reset-password')
  @ApiBody({ type: [ResetPasswordDto] })
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data);
  }
}
