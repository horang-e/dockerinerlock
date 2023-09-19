import { Modal, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { restApi } from '../../../apis';

interface IVolModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VolModal = (props: IVolModalProps) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const [volume, setVolume] = useState<{ [key: string]: any }>({});

  const createVolume = async () => {
    await restApi
      .post('/docker/volume', volume)
      .then((res) => {
        console.log(res);
        props.setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box id="modal-modal-description" sx={{ mt: 2 }} display={'flex'} flexDirection={'column'} gap={1}>
          <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={'bold'}>
            생성하기
          </Typography>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}>
              VolumeName
            </Typography>
            <TextField
              id="containerName"
              variant="outlined"
              sx={{ width: '100%' }}
              onChange={(e) => setVolume({ volumeId: e.target.value })}
            />
          </Box>
        </Box>
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => createVolume()}>
          생성하기
        </Button>
      </Box>
    </Modal>
  );
};

export default VolModal;
