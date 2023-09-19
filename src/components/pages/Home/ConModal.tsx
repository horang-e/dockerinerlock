import { Modal, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { restApi } from '../../../apis';
import { snackBar } from '../../../utils/SnackBar';

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
  const [data, setData] = useState<{ [key: string]: any }>({ publish: [], env: [], mountList: [] });
  const [mount, setMount] = useState<{ [key: string]: any }>({ type: 0, source: '', target: '' });
  const [volume, setVolume] = useState<{ [key: string]: any }[]>([]);
  const [image, setImage] = useState<{ [key: string]: any }[]>([]);
  const [snack, setSnack] = useState<boolean>(false);

  useEffect(() => {
    getVolList();
    getImageList();
  }, []);

  const getVolList = async () => {
    await restApi
      .get('/docker/volume')
      .then((res) => {
        setVolume(res.data.data);
      })
      .catch((err) => {
        snackBar({
          open: true,
          setOpen: setSnack,
          message: '서버 오류입니다. 잠시후 다시 시도해주세요.',
          severity: 'error',
        });
      });
  };

  const getImageList = async () => {
    await restApi
      .get('/docker/image/local')
      .then((res) => {
        setImage(res.data.data);
      })
      .catch((err) => {
        snackBar({
          open: true,
          setOpen: setSnack,
          message: '서버 오류입니다. 잠시후 다시 시도해주세요.',
          severity: 'error',
        });
      });
  };

  let resultObject: { [key: string]: string } = {};

  const createContainer = async () => {
    data.env.forEach((item: any) => {
      const [key, value] = item.split(':'); // 문자열을 ':'를 기준으로 분리
      resultObject[key] = value;
    });
    // console.log(resultObject);

    await restApi
      .post('/docker/container', { ...data, env: resultObject })
      .then((res) => {
        props.setOpen(false);
        snackBar({
          open: true,
          setOpen: setSnack,
          message: '컨테이너등록에 성공했습니다.',
          severity: 'success',
        });
      })
      .catch((err) => {
        snackBar({
          open: true,
          setOpen: setSnack,
          message: '서버 오류입니다. 잠시후 다시 시도해주세요.',
          severity: 'error',
        });
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
        <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={'bold'}>
          생성하기
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2 }} display={'flex'} flexDirection={'column'} gap={1}>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}>
              ContainerName
            </Typography>
            <TextField
              id="containerName"
              variant="outlined"
              onChange={(e) => setData({ ...data, containerName: e.target.value })}
            />
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography fontWeight={'bold'} width={'140px'}>
              Image
            </Typography>
            <FormControl>
              <Select onChange={(e) => setData({ ...data, imageId: e.target.value })}>
                {image.length !== 0 &&
                  image?.map((item: any) => {
                    return <MenuItem value={item.inspect.imageId}>{item.imageName}</MenuItem>;
                  })}
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
                          publishList: prev.publish.filter((port: string) => port !== item),
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
              MountList
            </Typography>
            <Select value={mount.type} onChange={(e) => setMount({ ...mount, type: e.target.value })}>
              <MenuItem value={0}>volume</MenuItem>
              <MenuItem value={1}>bind</MenuItem>
              <MenuItem value={2}>tmpfs</MenuItem>
            </Select>
            <Select
              value={mount.source}
              onChange={(e) =>
                setMount({
                  ...mount,
                  source: e.target.value,
                  target: volume.filter((item: any) => item.volumeName === e.target.value)[0].mountPoint,
                })
              }
            >
              {volume?.length !== 0 &&
                volume?.map((item: any) => <MenuItem value={item.volumeName}>{item.volumeName}</MenuItem>)}
            </Select>
            <ControlPointIcon
              onClick={() => {
                setData({ ...data, mountList: [...data.mountList, mount] });
                setMount({ type: 0, source: '', target: '' });
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
              {data?.mountList &&
                data?.mountList?.map((item: any) => (
                  <Typography
                    sx={{
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {item.type} : {item.source} : {item.target}
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
        </Box>
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => createContainer()}>
          생성하기
        </Button>
      </Box>
    </Modal>
  );
};

export default ConModal;
