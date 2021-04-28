//@ts-ignore
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta name='application-name' content='Stravando App' />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta name='apple-mobile-web-app-status-bar-style' content='default' />
					<meta name='apple-mobile-web-app-title' content='Stravando App' />
					<meta name='description' content='See your stats in Strava in a nice way' />
					<meta name='format-detection' content='telephone=no' />
					<meta name='mobile-web-app-capable' content='yes' />
					{/* <meta name='msapplication-config' content='/static/icons/browserconfig.xml' /> */}
					<meta name='msapplication-TileColor' content='#fc5200' />
					<meta name='msapplication-tap-highlight' content='no' />
					<meta name='theme-color' content='#181B23' />

					<link rel='apple-touch-icon' href='/favicon.png' />
					<link rel='apple-touch-icon' sizes='152x152' href='/favicon.png' />
					<link rel='apple-touch-icon' sizes='180x180' href='/favicon.png' />
					<link rel='apple-touch-icon' sizes='167x167' href='/favicon.png' />

					<link rel='icon' type='image/png' sizes='32x32' href='/favicon.png' />
					<link rel='icon' type='image/png' sizes='16x16' href='/favicon.png' />
					<link rel='manifest' href='/static/manifest.json' />
					<link rel='mask-icon' href='/favicon.png' color='#fc5200' />
					<link rel='shortcut icon' href='/favicon.ico' />

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
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
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