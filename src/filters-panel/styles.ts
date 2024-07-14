const FILTERS_PANEL_STYLES = {
    position: 'sticky',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
    '& > :not(style)': {
        m: 1,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        width: '340px'
    }
};

const FILTERS_PANEL_TOP_STYLES = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};

const FILTERS_PANEL_MAIN_STYLE = { 
    flex: 1, 
};

export { 
    FILTERS_PANEL_STYLES, 
    FILTERS_PANEL_TOP_STYLES,
    FILTERS_PANEL_MAIN_STYLE
};