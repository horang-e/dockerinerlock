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

type Props = {};

const Index = (props: Props) => {
  const [deleteOn, setDeleteOn] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [volume, setVolume] = React.useState([
    {
      driver: 'local',
      contanierCount: 'N/A',
      mountpoint: '/var/lib/docker/volumes/test/_data',
      volumeName: 'test',
      scope: 'local',
      size: 'N/A',
      status: 'N/A',
    },
    {
      driver: 'local',
      contanierCount: 'N/A',
      mountpoint: '/var/lib/docker/volumes/test1/_data',
      volumeName: 'test1',
      scope: 'local',
      size: 'N/A',
      status: 'N/A',
    },
    {
      driver: 'local',
      contanierCount: 1,
      mountpoint: '/var/lib/docker/volumes/test2/_data',
      volumeName: 'test2',
      scope: 'local',
      size: 'N/A',
      status: 'N/A',
    },
  ]);

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
      containerCount: 0,
      mountPoint: '/var/lib/docker/volumes/test1/_data',
      volumeName: 'test1',
      inspect: {
        driver: 'local',
        scope: 'local',
        size: '0B',
        createdAt: '2023-08-17T06:55:14Z',
        labels: null,
        containerNames: [],
      },
    },
    {
      containerCount: 0,
      mountPoint: '/var/lib/docker/volumes/desk1/_data',
      volumeName: 'desk1',
      inspect: {
        driver: 'local',
        scope: 'local',
        size: '0B',
        createdAt: '2023-08-23T08:15:00Z',
        labels: null,
        containerNames: [],
      },
    },
    {
      containerCount: 0,
      mountPoint: '/var/lib/docker/volumes/desk4/_data',
      volumeName: 'desk4',
      inspect: {
        driver: 'local',
        scope: 'local',
        size: '0B',
        createdAt: '2023-08-23T08:24:27Z',
        labels: null,
        containerNames: [],
      },
    },
    {
      containerCount: 0,
      mountPoint: '/var/lib/docker/volumes/test/_data',
      volumeName: 'test',
      inspect: {
        driver: 'local',
        scope: 'local',
        size: '0B',
        createdAt: '2023-08-17T06:55:12Z',
        labels: null,
        containerNames: [],
      },
    },
  ];

  return (
    <div>
      <Button onClick={() => setDeleteOn(!deleteOn)} variant="contained">
        {deleteOn ? '완료' : '삭제하기'}
      </Button>
      <Button onClick={() => setModalOpen(true)} variant="contained">
        생성하기
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
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
          <TableBody>
            {data.map((row, i) => (
              <Row key={i} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <VolModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default Index;
