import React, { useCallback, useEffect, useRef } from 'react';
import {
  List,
  Box,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Collapse,
  Modal,
  TextField,
} from '@mui/material';

import ConModal from './ConModal';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { restApi } from '../../../apis';
import { snackBar } from '../../../utils/SnackBar';
import { WsProps } from '../../../navigations/BaseLayout';
import { stringify } from 'querystring';

type Props = {};

const Index = (props: WsProps) => {
  const [deleteOn, setDeleteOn] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [snack, setSnack] = React.useState<boolean>(false);
  const [dockerInfo, setDockerInfo] = React.useState<{ [key: string]: any }>({
    dockerId: 'a9c63c4a-f5f4-48c9-b71e-ba9cad6b5127',
    containerCount: 3,
    imageCount: 2,
    fileDescriptorCount: 29,
    memTotal: 1012654080,
    memLimit: true,
    pidLimit: true,
    cpuPeriodLimit: true,
    cpuQuotaLimit: true,
    debugEnable: false,
    kernelVersion: '5.19.0-1025-aws',
    operatingSystem: 'Ubuntu 22.04.2 LTS',
    osVersion: '22.04',
    osType: 'linux',
    architecture: 'x86_64',
    dockerRootDir: '/var/lib/docker',
    serverVersion: '24.0.5',
    outOfMemoryKill: false,
  });
  const [openD, setOpenD] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any[]>([]);
  const getContainerList = async () => {
    await restApi.get('/docker/container').then((res) => {
      setData(res.data.data);
    });
  };
  function Row(props: { [key: string]: any }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.containerName}
          </TableCell>
          <TableCell align="right">{row.volumeCount}</TableCell>
          <TableCell align="right">{row.state}</TableCell>
          <TableCell align="right">
            {deleteOn ? (
              <IconButton edge="end" aria-label="delete" onClick={() => deleteContainer(row.inspect?.containerId)}>
                <DeleteIcon />
              </IconButton>
            ) : (
              <>
                <IconButton edge="end" aria-label="play" onClick={() => updateStatus(row.inspect?.containerId, 0)}>
                  <PlayArrowIcon />
                </IconButton>
                <IconButton edge="end" aria-label="pause" onClick={() => updateStatus(row.inspect?.containerId, 1)}>
                  <PauseIcon />
                </IconButton>
                <IconButton edge="end" aria-label="refresh" onClick={() => updateStatus(row.inspect?.containerId, 2)}>
                  <RefreshIcon />
                </IconButton>
              </>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Inspect
                </Typography>
                <List>
                  {Object.entries(row.inspect)?.map(([key, value]) => (
                    <ListItem>
                      <ListItemText primary={key} />
                      {typeof value === 'string' ? (
                        <ListItemText primary={value} />
                      ) : Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' ? (
                        <ListItemText
                          sx={{
                            border: 'thick double  black',
                            maxHeight: 200,
                            overflowY: 'auto',
                            padding: 2,
                          }}
                          primary={value?.map((va: { [key: string]: any }, index) =>
                            Object.entries(va)?.map(([k, v], i) => (
                              <div
                                key={i}
                                style={{
                                  borderBottom: i === Object.entries(va).length - 1 ? '1px solid black' : undefined,
                                }}
                              >
                                {k} : {v}
                              </div>
                            )),
                          )}
                        />
                      ) : Array.isArray(value) && value.length > 0 && typeof value[0] === 'string' ? (
                        <ListItemText
                          primary={value?.map((env: any) => (
                            <div>{env}</div>
                          ))}
                        />
                      ) : (
                        <ListItemText primary={value as string} />
                      )}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  props.ws.current.onmessage = function (event: any) {
    console.log(event.data, 'MESSAGE');
    const data = JSON.parse(event.data);
    if (Array.isArray(data.data)) {
      setData(data.data);
    } else if (data.data !== null) {
      setDockerInfo(data.data);
    }
  };

  const deleteContainer = async (containerName: string) => {
    await restApi
      .delete(`/docker/container/${containerName}`)
      .then((res) => {
        snackBar({
          open: true,
          setOpen: setSnack,
          message: '삭제되었습니다.',
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

  const updateStatus = async (containerId: string, status: number) => {
    await restApi
      .put('/docker/container/status', { containerId, status })
      .then((res) => {
        snackBar({
          open: true,
          setOpen: setSnack,
          message: '상태가 변경되었습니다.',
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

  useEffect(() => {
    getContainerList();
  }, []);

  return (
    <Box>
      <Box bgcolor={'white'} padding={1} borderRadius={2}>
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h6" gutterBottom component="div">
            Docker Info
          </Typography>
          {openD ? (
            <KeyboardArrowUpIcon onClick={() => setOpenD(!openD)} />
          ) : (
            <KeyboardArrowDownIcon onClick={() => setOpenD(!openD)} />
          )}
        </Box>
        {dockerInfo.architecture &&
          openD &&
          Object.entries(dockerInfo)?.map(([key, value]) => (
            <Box display={'flex'} flexDirection={'row'} width={'100%'} sx={{ borderBottom: '0.5px solid #ddd' }}>
              <Typography variant="body1" sx={{ width: '30%', p: '5px' }}>
                {key}
              </Typography>

              <Typography
                variant="body1"
                component="div"
                sx={{
                  width: '70%',
                }}
              >
                {typeof value === 'string' ? value : value?.toString()}
              </Typography>
            </Box>
          ))}
      </Box>
      <Button onClick={() => setDeleteOn(!deleteOn)} variant="contained">
        {deleteOn ? '완료' : '삭제하기'}
      </Button>
      <Button onClick={() => setModalOpen(true)} variant="contained" sx={{ fontFamily: 'Pretendard-Regular' }}>
        생성하기
      </Button>
      <TableContainer component={Paper} sx={{ maxHeight: 740, height: '90%' }}>
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <DirectionsBoatFilledIcon />
              </TableCell>
              <TableCell>Container Name</TableCell>
              <TableCell align="right">Volume Count</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data?.length !== 0 && data?.map((row) => <Row key={row.containerName} row={row} />)}</TableBody>
        </Table>
      </TableContainer>
      {modalOpen && <ConModal open={modalOpen} setOpen={setModalOpen} />}
    </Box>
  );
};

export default Index;
