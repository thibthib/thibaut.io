import Head from 'next/head';
import { Portrait } from '../components/duple/Portrait';
import portraits from '../static/portraits/portraits.json';

const sizes = [480, 640, 800, 1080, 1280];

const getSources = name =>
    sizes.reduce((aggr, size) => ({
        ...aggr,
        [size]: {
            back: `static/portraits/${name}-back-${size}w.jpg`,
            front: `static/portraits/${name}-front-${size}w.jpg`
        }
    }));

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
        <header>
            <h1>
                Duple<span> Valse à deux temps</span>
            </h1>
        </header>
        <main>
            {portraits.map(portrait => (
                <Portrait
                    key={portrait.id}
                    id={portrait.id}
                    name={portrait.name}
                    placeholder={portrait.placeholder}
                    sources={getSources(portrait.name)}
                />
            ))}
        </main>
        <style global jsx>{`
            body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
                    sans-serif;
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
    </div>
);

export default Duple;
