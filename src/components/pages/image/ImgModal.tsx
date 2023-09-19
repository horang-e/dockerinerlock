import { Modal, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { restApi } from '../../../apis';

interface IImgModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImgModal = (props: IImgModalProps) => {
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

  const [image, setImage] = useState<{ [key: string]: any }>({});

  const pullImage = async () => {
    await restApi
      .post('/docker/image/local', image)
      .then((res) => {
        props.setOpen(false);
        console.log(res);
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
              ImageName
            </Typography>
            <TextField
              id="imageName"
              variant="outlined"
              sx={{ width: '100%' }}
              onChange={(e) => setImage({ ...image, imageName: e.target.value })}
            />
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}>
              ImageVersion
            </Typography>
            <TextField
              id="imageVersion"
              variant="outlined"
              sx={{ width: '100%' }}
              onChange={(e) => setImage({ ...image, imageVersion: e.target.value })}
            />
          </Box>
        </Box>{' '}
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => pullImage()}>
          생성하기
        </Button>
      </Box>
    </Modal>
  );
};

export default ImgModal;
