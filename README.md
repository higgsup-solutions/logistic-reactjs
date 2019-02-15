This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### --------------------------------------------------------------start----------------------------------------------------------------
### overview structure
 - components folder will contain all component in app.
 - each screen is a subfolder in component folder.
 - child component of screen will is a file *.component.js in folder screen.
 - all component reuse allocate in the share folder.
 - all string url routing in app will write in file App.url.js
  example: 
  
            export const LOGIN = '/login';
            export const BUYSALE = '/buy-sale';
            export const DASHBOARD = '/dashboard';
  
  - all string url endpoint to call ajax will write in file intergrate.endpoint.js
  example: 
    
             export const API_ROOT = 'http://api.ico.href.vn';
             export const LOGIN = '/auth/login';
             export const DASHBOARD = '/profile';
             export const BUYSALE = '/school';
  
  - all variable const will write in App.constant.js
  example:
  
             export const ROLE_MANAGER = ['manager', 'admin'];
             export const ROLE_ADMIN = ['admin'];
  
  - image, gif, video ... in folder assets
  - function process common will in folder utils (string.js, datetime.js, number.js, role.js....)
  example:
  
          const dateFormat = {
              ddmmyyyy: (date) => {
                  const d = new Date(date);
                  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
              },
              ddmmyyyyHHMM: (date) => {
                  const d = new Date(date);
                  return d.toLocaleDateString("en-GB",{ year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric',minute:'numeric' });
              },
          };

### create new screen:
 - create a folder in folder components.  (same as buy-sale folder, dashboard folder....)
 - create a file *.scss and a file *.component.js, (same as dashboard.component.js and dashboard.scss)
    if that component have multi child component then each child component will is a file *.component.js in that folder. 
    (same as calendar-block.component.js is child of dashboard component)
    (child component will use style of file .scss in that folder).
 - if new screen must authentication then it will be routed in private route component in App2.js (same as booking, booking-history, ...)
 example: 
 
                            <PrivateRoute component={LayoutComponent} path="/" >
                                <Redirect from="/" to='booking' noThrow />
                                <Authorization WrappedComponent={Booking} allowedRoles={ROLE_MANAGER} path="/booking"/>
                                <Authorization WrappedComponent={BookingHistory} allowedRoles={ROLE_ADMIN} path="/booking-history"/>
                            </PrivateRoute>
 
    else it will be routed in public layout component (login, register...).
    example: 
    
                        <PublicLayoutComponent path="/public" >
                                 <Redirect from="/" to='public/login' noThrow />
                                 <LoginComponent path="/login" />
                                 <RegisterComponent path="register"/>
                        </PublicLayoutComponent>
    
 - if new screen must have role to access then it will wrapped in Authorization component and pass roles to it.
 example:
    
                                <Route exact path={LOGIN} component={LoginComponent}/>
                                <Route exact path={BUYSALE} component={Authorization(BuySale, ROLE_MANAGER)}/>
 
 - all UI of new screen (component in that screen) will follow HTML of theme using (if have),
    in case must modify css then will override.
 - redirect between screens need pass data will pass via url. 
 example:
 
                    this.props.navigate(url, params)
                    
                    or
                    
                    <Link to={{
                        pathname: '/buy-sale',
                        search: '?query=abc'
                    }}> My Link </Link>
                    
 destination get data by: 
 
                    const params = new URLSearchParams(this.props.location.search);
                    console.log(params.get('detail'))
                    console.log(this.props.location.dataObject)
    
### create new component:
 - create new component re-use will create file *.component.js in folder share and style in share.scss
 (same as popup-confirm.component.js, footer.component.js...)
 - all text need translate in template of component will write <FormattedMessage id="[key]"> (key write in ./i18n/en.js | vn.js ...)
 - all text need translate in code js will write this.props.intl.formatMessage({id: 'base.pass'}) in code.
 
### call API:
 - init data for component call in function componentWillMount()
    example: 
 
            componentWillMount() {
                    buysale.get().then(res => {
                        console.log(res);
                        let newState = this.state;
                        newState.listSchool = res;
                        this.setState(newState);
                    });
            }
 
 - each screen will create a file [screen-name].js in folder intergrate. (same as dashboard.js, buy-sale.js...)
 - each event call API will write a function and return function (get, post, put, delete) these wrote in file intergrate
    and we will pass data and url.
 - about process error common will write at function (get, post, put, delete) in intergrate.js.
 - in event of component will only process when response is success. (redirect, alert, update state ....).
 - example: => intergrate/dashboard.js
               
               get: () => {
                    let filterUrl = `?limit=10&offset=0`;
            
                    return intergrate.request.get(`${API_ROOT}${DASHBOARD}${filterUrl}`).then(res => {
                        return res.data;
                    })
                }
 
 



