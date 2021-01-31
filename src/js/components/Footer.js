import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	footer: {
		backgroundColor: theme.palette.primary.main,
		width: '100%',
		position: 'absolute',
		bottom: '0',
		color: 'white',
		height: '15vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	footerTitle: {
		flexGrow: 4,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',

		fontSize: '2rem',
	},
	footerCopy: {
		flexGrow: 1,
	},
	footerMargin: {
		height: '12rem',
	},
}));

export default function Footer() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<footer className={classes.footer}>
				<Typography variant='h4' className={classes.footerTitle}>
					MovieNG
				</Typography>
				<Typography variant='body1' className={classes.footerCopy}>
					Created 2020, Nati Kamusher
				</Typography>
				<div>
					Icons made by{' '}
					<a
						href='https://www.flaticon.com/authors/vitaly-gorbachev'
						title='Vitaly Gorbachev'>
						Vitaly Gorbachev
					</a>{' '}
					from{' '}
					<a href='https://www.flaticon.com/' title='Flaticon'>
						www.flaticon.com
					</a>
				</div>
				<div>
					Icons made by{' '}
					<a
						href='https://www.flaticon.com/authors/vectors-market'
						title='Vectors Market'>
						Vectors Market
					</a>{' '}
					from{' '}
					<a href='https://www.flaticon.com/' title='Flaticon'>
						www.flaticon.com
					</a>
				</div>
				<div>
					Icons made by{' '}
					<a href='https://www.freepik.com' title='Freepik'>
						Freepik
					</a>{' '}
					from{' '}
					<a href='https://www.flaticon.com/' title='Flaticon'>
						www.flaticon.com
					</a>
				</div>
			</footer>
			<FooterMargin />
		</React.Fragment>
	);
	function FooterMargin() {
		return <div className={classes.footerMargin} />;
	}
}
