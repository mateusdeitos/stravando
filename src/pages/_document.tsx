//@ts-ignore
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
					<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
					<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
					<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
					<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
					<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
					<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
					<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="manifest" href="/manifest.json" />
					<meta name="msapplication-TileColor" content="#fc5200" />
					<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />

					<meta name='twitter:card' content='summary' />
					<meta name='twitter:url' content='https://stravando.vercel.app' />
					<meta name='twitter:title' content='Stravando App' />
					<meta name='twitter:description' content='See your stats in Strava in a nice way' />
					<meta name='twitter:image' content='https://stravanco.vercel.app/favicon.png' />
					<meta name='twitter:creator' content='@mcdeitos' />
					<meta property='og:type' content='website' />
					<meta property='og:title' content='Stravando App' />
					<meta property='og:description' content='See your stats in Strava in a nice way' />
					<meta property='og:site_name' content='Stravando App' />
					<meta property='og:url' content='https://stravando.vercel.app' />
					<meta property='og:image' content='https://stravando.vercel.app/favicon.png' />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
					<script dangerouslySetInnerHTML={{ __html: "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N96LKJV');" }}></script>
				</Head>
					<body>
						<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N96LKJV" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
						<Main />
						<NextScript />
					</body>
			</Html>
		)
	}
}