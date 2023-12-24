import { useCallback, FormEvent, useState } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';
import { createShortLink } from '../api';

export default function Home() {

    const [link, setLink] = useState('');

    const saveHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const currentTarget = event.currentTarget;
        const data = new FormData(currentTarget);
        const value = data.get('text') as string;

        if (value) {
            createShortLink(value).then((res) => {
                currentTarget.reset();
                setLink(res);
            });
        }
    }, []);

    const close = useCallback(() => {
        setLink('');
    }, [])

    return (
        <Box
            component="form"
            onSubmit={saveHandler} 
            sx={{
              margin: 'auto',
              width: '80%',
              maxWidth: '800px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {
                link ? <LinkContent link={link} close={close}/> : <InputContent />
            }
        </Box>
    );
}

const InputContent = () => {
    return (
        <>
            <Typography component="h1" variant="h5" align="center">
                Paste the URL to be shortened
            </Typography>

            <Box component="div" sx={{width: '100%', display: 'flex', marginTop: 2}}>
                <TextField
                    name="text"
                    sx={{flex: '1'}}
                    autoFocus
                />
                <Button type="submit" variant="contained" sx={{ marginLeft: '-4px' }} >
                    Shorten URL
                </Button>
            </Box>
        </>
    );
}

const LinkContent = ({link, close}: {link: string, close: () => void}) => {
    const copy = useCallback(() => navigator.clipboard.writeText(link), [link]);

    return (
        <Box component="div" sx={{ display: 'flex', marginTop: 2, alignItems: 'baseline'}}>
            <Button onClick={close} variant="contained">Back</Button>
            <Button onClick={copy} variant="contained" sx={{ marginLeft: 2, marginRight: 2}}>Copy</Button>
            <a target='_blank' rel='noreferrer' href={link}>{link}</a>
        </Box>
    );
}