import { BadRequestException, Injectable, BadGatewayException, InternalServerErrorException } from '@nestjs/common';
import * as mailer  from '@nestjs-modules/mailer';
import { response } from 'express';

@Injectable()
export class MailerService {
    constructor(private readonly mailer: mailer.MailerService) {}

    async send(
        role: number,
        toArr: string[],
        subject: string,
        templateName: string,
        context: any = {},
    ): Promise<object>{
        if(role === 1){
            const newMail = await this.mailer.sendMail({
                to: toArr.join(', '),
                subject,
                template: `${templateName}`,
                context,
            });
            console.log(newMail)
            if(newMail && newMail.response.split(' ')[2] === 'OK'){
                return new Object({ message: 'an confirmation letter has been sent' })
            } else {
                return new InternalServerErrorException('service unavailable(mailer)')
            }
            
        } else {
            return new Object({ message: 'successful' })
        }
    }
}
