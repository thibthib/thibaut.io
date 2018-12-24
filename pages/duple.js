import Head from 'next/head';
import { Portrait } from '../components/duple/portrait';
import portraits from '../static/portraits/portraits.json';

const Duple = () => (
    <div>
        <Head>
            <title>Duple – by thibaut</title>
            <meta name="description" content="Photos by thib_thib" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
        </Head>
        <style global jsx>{`
            body {
                margin: 0;
            }
        `}</style>
        <style jsx>{`
            h1 {
                text-transform: uppercase;
                text-align: center;
                font-size: 40px;
                line-height: 40px;
                color: #555;
            }

            h1 span {
                font-weight: 400;
                font-size: 26px;
                display: inline-block;
                vertical-align: top;
                color: #ccc;
                display: block;
            }
        `}</style>
        <header>
            <h1>
                Duple<span> Valse à deux temps</span>
            </h1>
        </header>
        <main>
            <div className="Tutorial">
                <div className="Tooltip" />
            </div>
            {portraits.map(portrait => (
                <Portrait
                    key={portrait.id}
                    id={portrait.id}
                    name={portrait.name}
                    placeholder={portrait.placeholder}
                />
            ))}
        </main>
    </div>
);

export default Duple;
