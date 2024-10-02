import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Button, Grid, Paper, AppBar, Toolbar, 
  IconButton, Avatar, Card, CardContent, CardActions, Snackbar, Alert,
  Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Refresh as RefreshIcon, 
  ExitToApp as LogoutIcon, 
  Dashboard as DashboardIcon,
  Help as HelpIcon,
  BarChart as ChartIcon,
  Add as AddIcon
} from '@mui/icons-material';
import ErrorForm from '../components/ErrorForm';
import TopErrorsList from '../components/TopErrorsList';
import ErrorChart from '../components/ErrorChart';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
}));

const HighlightedButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  padding: theme.spacing(1, 3),
  fontSize: '1.1rem',
  fontWeight: 'bold',
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[8],
    transform: 'translateY(-2px)',
  },
}));

function Dashboard() {
  const navigate = useNavigate();
  const [topErrors, setTopErrors] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [drawerOpen, setDrawerOpen] = useState(false);


  const fetchTopErrors = async () => {
    try {
      const response = await axios.get('https://stimuler-python.onrender.com/top-errors?n=10', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      setTopErrors(response.data.errors || []);
    } catch (error) {
      console.error('Error fetching top errors:', error);
      showSnackbar('Failed to fetch top errors', 'error');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/auth');
    } else {
      fetchTopErrors();
    }
  }, [navigate]);

  const generateDummyData = async () => {
    try {
      await axios.post('https://stimuler-python.onrender.com/generate-dummy-data', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      showSnackbar('Dummy data generated successfully');
      fetchTopErrors();
    } catch (error) {
      console.error('Error generating dummy data:', error);
      showSnackbar('Failed to generate dummy data', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/auth');
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleErrorAdded = () => {
    showSnackbar('Error added successfully');
    fetchTopErrors();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/how-it-works">
          <ListItemIcon><HelpIcon /></ListItemIcon>
          <ListItemText primary="How it Works" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <DashboardIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Stimuler Dashboard
          </Typography>
          <CenteredBox>
            <HighlightedButton
              component={Link}
              to="/how-it-works"
              startIcon={<HelpIcon />}
            >
              How it Works
            </HighlightedButton>
          </CenteredBox>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={fetchTopErrors}>
            <RefreshIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
          <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>
            {localStorage.getItem('username')?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        {drawerContent}
      </Drawer>
      <Main open={drawerOpen}>
        <Toolbar />
        <StyledContainer maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Add New Error
                  </Typography>
                  <ErrorForm onErrorAdded={handleErrorAdded} />
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Top Errors
                  </Typography>
                  <TopErrorsList errors={topErrors} />
                </CardContent>
                <CardActions>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={generateDummyData}
                    startIcon={<RefreshIcon />}
                  >
                    Generate Dummy Data
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
            {/* <Grid item xs={12}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Error Distribution
                  </Typography>
                  <ErrorChart errors={topErrors} />
                </CardContent>
              </StyledCard>
            </Grid> */}
          </Grid>
        </StyledContainer>
      </Main>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;