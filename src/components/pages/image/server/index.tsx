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
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImgModal from '../ImgModal';
import { WsProps } from '../../../../navigations/BaseLayout';


type Props = {};

const Index = (props: WsProps) => {
  const [deleteOn, setDeleteOn] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

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
            {row.imageName}
          </TableCell>
          <TableCell align="right">{row.containerCount}</TableCell>
          <TableCell align="right">{row.imageVersion}</TableCell>
          <TableCell align="right">
            <IconButton edge="end" aria-label="delete">
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
      containerCount: '3',
      imageName: 'jinlobil/ngintest',
      imageVersion: '0.1',
      inspect: {
        size: '187MB',
        createdAt: '2023-08-16 09:50:55 +0000 UTC',
        imageId: 'sha256:eea7b3dcba7ee47c0d16a60cc85d2b977d166be3960541991f3e6294d795ed24',
        os: 'linux',
        env: [
          'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
          'NGINX_VERSION=1.25.2',
          'NJS_VERSION=0.8.0',
          'PKG_RELEASE=1~bookworm',
        ],
        architecture: 'amd64',
      },
    },
    {
      containerCount: '1',
      imageName: 'busybox',
      imageVersion: 'latest',
      inspect: {
        size: '4.26MB',
        createdAt: '2023-07-18 23:19:33 +0000 UTC',
        imageId: 'sha256:a416a98b71e224a31ee99cff8e16063554498227d2b696152a9c3e0aa65e5824',
        os: 'linux',
        env: ['PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'],
        architecture: 'amd64',
      },
    },
    {
      containerCount: '0',
      imageName: 'ubuntu',
      imageVersion: '16.04',
      inspect: {
        size: '135MB',
        createdAt: '2021-08-31 01:21:30 +0000 UTC',
        imageId: 'sha256:b6f50765242581c887ff1acc2511fa2d885c52d8fb3ac8c4bba131fd86567f2e',
        os: 'linux',
        env: ['PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'],
        architecture: 'amd64',
      },
    },
  ];

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
                <InsertDriveFileIcon />
              </TableCell>
              <TableCell>Image Name</TableCell>
              <TableCell align="right">Container Count</TableCell>
              <TableCell align="right">Image Version</TableCell>
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
      <ImgModal open={modalOpen} setOpen={setModalOpen} />
    </Box>
  );
};

export default Index;
