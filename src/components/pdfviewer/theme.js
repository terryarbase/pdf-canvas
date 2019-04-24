import grey from '@material-ui/core/colors/grey';

const theme = {
	menuIconCommonTheme: {
		position: 'fixed',
		left: '15px',
		top: '15px',
		cursor: 'pointer',	
		width: '30px',
		height: '30px',
		color: grey[500],
		zIndex: 9,
		'&:hover': {
			color: grey[700],
		},
	},
	centralBlockTheme: {
		position: 'absolute',
	    left: '50%',
	    top: '50%',
	    transform: 'translate(-50%,-50%)',
	},
	backdropTheme: {
		position: 'fixed',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: '#000000',
		opacity: 0.5,
		zIndex: 1199,
	},
	controlContainerTheme: {
		alignItems: 'center',
        justifyContent: 'space-between',
        display: 'inline-block',
	},
	controlInputTheme: {
		backgroundColor: 'white',
        borderRadius: '5px',
        color: 'black',
        border: 0,
        verticalAlign: 'middle',
        textAlign: 'center',
        height: '30px',
        width: '40px',
        outline: 'none',
        margin: '0 5px',
        fontSize: '16px',
        fontWeight: 'bolder',
        userSelect: 'none',
	},
};

export default theme;
