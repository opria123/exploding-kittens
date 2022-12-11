import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import GameAudio from '../../../utils/audio';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { List, ListItem } from '@material-ui/core'


export default function AudioControls() {
    let volume = GameAudio.getVolumeState();
    let isMuted = GameAudio.getMutedState();

    let [value, setValue] = useState(volume * 100);
    let [muted, setMuted] = useState(isMuted);

    const volumeChange = (event, newValue) => {
        setValue(newValue); 
        GameAudio.changeMusicVolume(newValue / 100);
    };

    const toggleMute = () => {
        setMuted(!muted)
        if (muted === false) {
            GameAudio.muteMusicVolume();
        } else {
            GameAudio.unMuteMusicVolume();
        }
    }

    return (
        <Box className="volume-controls" sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <List>
                    <ListItem>
                        <ListItem button className="no-sidepadding" onClick={() => toggleMute()}>
                            {muted ? <VolumeOffIcon /> : <VolumeDown />}
                        </ListItem>
                    </ListItem>
                </List>
                <Slider aria-label="Volume" value={value} onChange={volumeChange} />
                <VolumeUp />
            </Stack>
        </Box>
    );
}