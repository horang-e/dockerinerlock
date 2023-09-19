import React, { useEffect } from 'react';
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
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VolModal from './VolModal';
import { restApi } from '../../../apis';
import { snackBar } from '../../../utils/SnackBar';
import { WsProps } from '../../../navigations/BaseLayout';

type Props = {};

const Index = (props: WsProps) => {
  const [deleteOn, setDeleteOn] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [snack, setSnack] = React.useState<boolean>(false);
  const [volume, setVolume] = React.useState([]);

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
            {row.volumeName}
          </TableCell>
          <TableCell align="right">{row.containerCount}</TableCell>
          <TableCell align="right">{row.mountPoint}</TableCell>
          <TableCell align="right">
            <IconButton edge="end" aria-label="delete" onClick={() => deleteVolume(row.volumeName)}>
              <DeleteIcon />
            </IconButton>
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
                          primary={value.map((va: { [key: string]: any }, index) =>
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
                          primary={value.map((env: any) => (
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
    if (Array.isArray(data.data)) setVolume(data.data);
  };

  const getVolume = async () => {
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

  const deleteVolume = async (volumeId: string) => {
    await restApi
      .delete(`/docker/volume/${volumeId}`)
      .then((res) => {
        snackBar({
          open: true,
          setOpen: setSnack,
          message: '삭제되었습니다.',
          severity: 'success',
        });
        getVolume();
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
    getVolume();
  }, []);

  return (
    <Box height={'90%'}>
      <Button onClick={() => setModalOpen(true)} variant="contained">
        생성하기
      </Button>
      <TableContainer component={Paper} sx={{ maxHeight: 740, height: '90%' }}>
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <InboxIcon />
              </TableCell>
              <TableCell>Volume Name</TableCell>
              <TableCell align="right">Container Count</TableCell>
              <TableCell align="right">Mount Point</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflowY: 'scroll', maxHeight: '60%' }}>
            {volume?.map((row, i) => (
              <Row key={i} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <VolModal open={modalOpen} setOpen={setModalOpen} />
    </Box>
  );
};

export default Index;
