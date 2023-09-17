import React from 'react';
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

type Props = {};

const Index = (props: Props) => {
  const [deleteOn, setDeleteOn] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            ) : (
              <>
                <IconButton edge="end" aria-label="play">
                  <PlayArrowIcon />
                </IconButton>
                <IconButton edge="end" aria-label="pause">
                  <PauseIcon />
                </IconButton>
                <IconButton edge="end" aria-label="refresh">
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
                      ) : (
                        Array.isArray(value) &&
                        value.length > 0 &&
                        typeof value[0] === 'string' && (
                          <ListItemText
                            primary={value.map((env: any) => (
                              <div>{env}</div>
                            ))}
                          />
                        )
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

  const data = [
    {
      volumeCount: 1,
      containerName: 'cast123',
      state: 'exited',
      inspect: {
        createdAt: '2023-08-28 11:26:08 +0000 UTC',
        containerId: '546da961945600d28756c3e55e968b2888f990910e4863fcd4f22b0779c493eb',
        imageId: 'a416a98b71e2',
        size: '0B',
        mounts: [
          {
            type: 'volume',
            name: 'desk',
            source: '/var/lib/docker/volumes/desk/_data',
            destination: '/var/lib/docker/volumes/desk/_data',
            driver: 'local',
            mode: 'z',
            rw: true,
          },
          {
            type: 'volume',
            name: 'desk',
            source: '/var/lib/docker/volumes/desk/_data',
            destination: '/var/lib/docker/volumes/desk/_data',
            driver: 'local',
            mode: 'z',
            rw: true,
          },
        ],
        ports: ['http://port:80/tcp', 'http://port:80/tcp'],
      },
    },
  ];

  return (
    <div>
      <Button onClick={() => setDeleteOn(!deleteOn)} variant="contained">
        {deleteOn ? '완료' : '삭제하기'}
      </Button>
      <Button onClick={() => setModalOpen(true)} variant="contained" sx={{ fontFamily: 'Pretendard-Regular' }}>
        생성하기
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
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
          <TableBody>
            {data.map((row) => (
              <Row key={row.containerName} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default Index;
