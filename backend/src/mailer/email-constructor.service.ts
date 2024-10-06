import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailConstructorService {
    readonly VICTIM_CATCH_PATH = 'phishing/catch';
    constructor() { }

    get victimCatchPath() {
        const host = process.env.APP_HOST;
        const port = process.env.APP_REVERSE_PORT;

        return `http://${host}:${port}/api/${this.VICTIM_CATCH_PATH}`;
    }

    getFromLine({
        senderEmail,
        senderUsername
    }: {
        senderUsername: string;
        senderEmail: string;
    }) {
        return `"${senderUsername}" <${senderEmail}>`;
    }

    getSubjectLine() {
        return `Dont open this link`;
    }

    getEmailAsString({ attackId }: { attackId: string; }) {
        const template = `
            <p>We've seen unusual activity on your account. This may mean that someone has used your account without your knowledge. To solve this problem, click the following link.</p>
            <a href="${this.victimCatchPath}?id=${attackId}">Go to my account</a>
        `;

        return template;
    }
}
