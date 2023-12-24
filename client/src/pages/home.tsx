import { useCallback, FormEvent, useState, ChangeEvent } from 'react';
import { TextField, Box, Button, IconButton } from '@mui/material';
import { createShortLink } from '../api';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function Home() {

    const [link, setLink] = useState('');

    const saveHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const currentTarget = event.currentTarget;
        const data = new FormData(currentTarget);
        const value = data.get('text') as string;

        if (value && isValidUrl(value)) {
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
            <img src="/favicon.svg" alt="logo" width="100px" style={{borderRadius: '50%', marginTop: '-100px'}}/>
            {
                link ? <LinkContent link={link} close={close}/> : <InputContent />
            }
        </Box>
    );
}

const InputContent = () => {

    const [helperText, setHelperText] = useState(' ');
    const [error, setError] = useState(false);

    const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!value || isValidUrl(value)) {
            setHelperText(' ');
            setError(false);
        } else {
            setHelperText('Invalid url');
            setError(true);
        }
    }, [])

    return (
        <Box component="div" sx={{width: '100%', height: '110px', display: 'flex', marginTop: 2, alignItems: 'baseline'}}>
            <TextField
                name="text"
                sx={{flex: '1'}}
                label="Paste the URL to be shortened"
                variant="standard"
                error={error}
                helperText={helperText}
                onChange={changeHandler}
                autoFocus
            />
            <Button type="submit" variant="text" sx={{ marginLeft: 2 }}>
                Shorten
            </Button>
        </Box>
    );
}

const LinkContent = ({link, close}: {link: string, close: () => void}) => {
    const copy = useCallback(() => navigator.clipboard.writeText(link), [link]);

    return (
        <Box component="div" sx={{width: '100%', height: '110px', display: 'flex', marginTop: 2, alignItems: 'baseline', flexWrap: 'wrap'}}>
            <TextField
                name="text"
                sx={{flex: '1', minWidth: '250px'}}
                label=" "
                variant="standard"
                disabled
                value={link}
                helperText=" "
            />
            <a target="_blank" rel="noreferrer" href={link}><IconButton title='Open' color="primary"><OpenInNewIcon /></IconButton></a>
            <div>
                <Button onClick={copy} variant="text" sx={{ marginRight: 1}}>Copy</Button>
                <Button onClick={close} variant="text">Back</Button>
            </div>
        </Box>
    );
}

function isValidUrl(url: string): boolean {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url);
}
