import { Modal, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface IConModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConModal = (props: IConModalProps) => {
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

  const [publish, setPublish] = useState<{ [key: string]: any }>({});
  const [env, setEnv] = useState<{ [key: string]: any }>({});
  const [data, setData] = useState<{ [key: string]: any }>({ publish: [], env: [] });

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={'bold'}>
          생성하기
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2 }} display={'flex'} flexDirection={'column'} gap={1}>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}>
              ContainerName
            </Typography>
            <TextField id="containerName" variant="outlined" />
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}>
              Image
            </Typography>
            <FormControl>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" defaultValue={10}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}>
              Publish
            </Typography>
            <TextField
              id="port"
              variant="outlined"
              sx={{
                width: 100,
                mr: 1,
              }}
              value={publish?.port1}
              onChange={(e) => {
                setPublish({ ...publish, port1: e.target.value });
              }}
            />
            :
            <TextField
              id="port"
              variant="outlined"
              sx={{
                width: 100,
                ml: 1,
                mr: 1,
              }}
              value={publish?.port2}
              onChange={(e) => {
                setPublish({ ...publish, port2: e.target.value });
              }}
            />
            /
            <TextField
              id="port"
              variant="outlined"
              sx={{
                width: 100,
                ml: 1,
                mr: 1,
              }}
              value={publish?.port3}
              onChange={(e) => {
                setPublish({ ...publish, port3: e.target.value });
              }}
            />
            <ControlPointIcon
              onClick={() => {
                setData((prev) => ({
                  ...prev,
                  publish: [...prev.publish, `${publish.port1}:${publish.port2}/${publish.port3}`],
                }));
                setPublish({
                  port1: '',
                  port2: '',
                  port3: '',
                });
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}></Typography>
            <Box
              sx={{
                maxHeight: 120,
                overflowY: 'auto',
                width: 300,
              }}
            >
              {data?.publish &&
                data?.publish?.map((item: string) => (
                  <Typography
                    sx={{
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {item}
                    <RemoveCircleOutlineIcon
                      onClick={() => {
                        setData((prev) => ({
                          ...prev,
                          publish: prev.publish.filter((port: string) => port !== item),
                        }));
                      }}
                    />
                  </Typography>
                ))}
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} width={'90%'}>
            <Typography fontWeight={'bold'} width={'140px'}>
              env
            </Typography>
            <TextField
              id="env"
              variant="outlined"
              sx={{
                width: 100,
                mr: 1,
              }}
              value={env?.env1}
              onChange={(e) => {
                setEnv({ ...env, env1: e.target.value });
              }}
            />
            :
            <TextField
              id="env"
              variant="outlined"
              sx={{
                width: 100,
                ml: 1,
              }}
              value={env?.env2}
              onChange={(e) => {
                setEnv({ ...env, env2: e.target.value });
              }}
            />
            <ControlPointIcon
              onClick={() => {
                setData({ ...data, env: [...data.env, `${env.env1}:${env.env2}`] });
                setEnv({ env1: '', env2: '' });
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}></Typography>
            <Box
              sx={{
                maxHeight: 120,
                overflowY: 'auto',
                width: 300,
              }}
            >
              {data?.env &&
                data?.env?.map((item: string) => (
                  <Typography
                    sx={{
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {item}
                    <RemoveCircleOutlineIcon
                      onClick={() => {
                        setData((prev) => ({
                          ...prev,
                          env: prev.env.filter((env: string) => env !== item),
                        }));
                      }}
                    />
                  </Typography>
                ))}
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}>
              mount
            </Typography>
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={10}
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          생성하기
        </Button>
      </Box>
    </Modal>
  );
};

export default ConModal;
