import { DialogContent, Grid, Paper, Typography, styled } from '@mui/material';
import { ReactNode, forwardRef } from 'react'

type ModalContentProps = {
    // ref?: ForwardedRef<HTMLElement>;
    width?: string;
    height?: string;
    title?: string;
    isLoading?: boolean;
    renderTitle?: () => ReactNode;
    renderBody: () => ReactNode;
    renderFooter?: () => ReactNode;
    className?: string;
}

const ModalContentBase = forwardRef<HTMLElement, ModalContentProps>((props, ref) => {
    const {renderTitle, renderBody, renderFooter, title} = props;
    return (
        <DialogContent ref={ref}>
            <Paper className={props.className} elevation={24}>
                <Grid 
                    style={{height: '100%', width: '100%'}}
                    container
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    {(renderTitle || title) && (
                        <Grid item xs={1} sx={{width: '100%', height: '100%'}}>
                            {title && (
                                <div 
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#c8e3de',
                                        height: '30px'
                                    }}
                                >
                                    <Typography sx={{fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold'}}>{title}</Typography>
                                </div>
                            )}
                            {renderTitle && renderTitle()}
                        </Grid>
                    )}
                    <Grid
                        item
                        xs
                        sx={{width: '100%', height: '100%'}}
                        container
                        direction='column'
                    >
                        {renderBody()}
                    </Grid>
                    {renderFooter && (
                        <Grid
                            item
                            xs={1}
                            sx={{width: '100%', height: '100%'}}
                        >
                            {renderFooter()}
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </DialogContent>
    )
})

export const ModalContent = styled(ModalContentBase)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) => (props.width ? props.width : 'fit-content')};
    height: ${(props) => (props.height ? props.height : 'fit-content')};
`;
