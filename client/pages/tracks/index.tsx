import { Box, Button, Card, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';

const index = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    {_id: '1', name: 'Track 1', artist: 'Artist 1', text: 'Smth text', listens: 1, audio: '', picture: '', comments: []},
    {_id: '2', name: 'Track 2', artist: 'Artist 2', text: 'Smth text', listens: 2, audio: '', picture: '', comments: []},
    {_id: '3', name: 'Track 3', artist: 'Artist 3', text: 'Smth text', listens: 3, audio: '', picture: '', comments: []},
  ];

  return (
    <MainLayout>
      <Grid container justify='center'>
        <Card style={{width: 900}}>
          <Box p={3}>
            <Grid container justify='space-between'>
              <h1>List of tracks</h1>
              <Button onClick={() => router.push('/tracks/create')}>Download</Button>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </MainLayout>
  );
}

export default index;
