import Document, { Main, NextScript, Head } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <html lang="en">
                <Head>{this.props.styles}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
