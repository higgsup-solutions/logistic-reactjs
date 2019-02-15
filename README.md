# React Higgsup Logistics

<a href="https://web.higgsup.com/"><img src="higgsup-logo.png"></a>

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
### this app use element-react theme
 - https://elemefe.github.io/element-react/#/en-US
### Overview structure
 - components folder will contain all component in app.
 - each screen is a subfolder in component folder.
 - child component of screen will is a file *.component.js in folder screen.
 - all component reuse allocate in the share folder.
 - all string url routing in app will write in file App.url.js
  example: 
  
            export const LOGIN = '/login';
            export const BUYSALE = '/buy-sale';
            export const DASHBOARD = '/dashboard';
  
  - all string url endpoint to call ajax will write in file integrate.endpoint.js
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

### Create new screen:
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
    
### Create new component:
 - create new component re-use will create file *.component.js in folder share and style in share.scss
 (same as popup-confirm.component.js, footer.component.js...)
 - all text need translate in template of component will write <FormattedMessage id="[key]"> (key write in ./i18n/en.js | vn.js ...)
 - all text need translate in code js will write this.props.intl.formatMessage({id: 'base.pass'}) in code.
 
### Call API:

 - `integrate.js` file defines axios instance, interceptors for request, response 
 and catch error for all request to backend
 
  - Each screen has a file `<screen-name>.js` in `integrate` folder. 
  E.g: `auth.js`, `dashboard.js`, `buy-sale.js`, ...
  
  - In that file, each action was displayed by a function which uses `integrate` 
  to call api. In that, we have to defines `url`, `method`, `data` in request.
  
  Example for `auth.js`
  ```js
     import integrate from './integrate';
     import {LOGIN} from "./integrate.endpoint";
     
     export const login = (data) => {
     
         return integrate.makeRequest({
             url: LOGIN,
             method: 'POST',
             data
         });
     };
 ```
 
  - There are 2 functions which were exported by `integrate.js`: 
  `makeRequest` calls api without token in header, while `makeAuthRequest` injects
   token to request backend.
   
  - How to use that api?
  
  ```
  login(data).then(res => {
      if (res.success) {
          localStorage.setItem('authentication', `Bearer ${res.data.accessToken}`);
          navigate(`/`);
      } else {
          alert('username or password is invalid');
      }
  })
  ```
   
 - **Best practice**: In order to init data for component, we should call api 
 in function componentWillMount()
 
 ### sample form follow element-react theme
 
            <Form className="en-US" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                  <Form.Item label="Activity name">
                    <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                  </Form.Item>
                  <Form.Item label="Activity zone">
                    <Select value={this.state.form.region} placeholder="Please select your zone">
                      <Select.Option label="Zone 1" value="shanghai"></Select.Option>
                      <Select.Option label="Zone 2" value="beijing"></Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Activity time">
                    <Layout.Col span="11">
                      <Form.Item prop="date1" labelWidth="0px">
                        <DatePicker
                          value={this.state.form.date1}
                          placeholder="Pick a date"
                          onChange={this.onChange.bind(this, 'date1')}
                        />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col className="line" span="2">-</Layout.Col>
                    <Layout.Col span="11">
                      <Form.Item prop="date2" labelWidth="0px">
                        <TimePicker
                          value={this.state.form.date2}
                          selectableRange="18:30:00 - 20:30:00"
                          placeholder="Pick a time"
                          onChange={this.onChange.bind(this, 'date2')}
                        />
                      </Form.Item>
                    </Layout.Col>
                  </Form.Item>
                  <Form.Item label="Instant delivery">
                    <Switch
                      onText=""
                      offText=""
                      value={this.state.form.delivery}
                      onChange={this.onChange.bind(this, 'delivery')}
                    />
                  </Form.Item>
                  <Form.Item label="Activity type">
                    <Checkbox.Group value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
                      <Checkbox label="Online activities" name="type"></Checkbox>
                      <Checkbox label="Promotion activities" name="type"></Checkbox>
                      <Checkbox label="Offline activities" name="type"></Checkbox>
                      <Checkbox label="Simple brand exposure" name="type"></Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item label="Resources">
                    <Radio.Group value={this.state.form.resource}>
                      <Radio value="Sponsor"></Radio>
                      <Radio value="Venue"></Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="Activity form">
                    <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" nativeType="submit">Create</Button>
                    <Button>Cancel</Button>
                  </Form.Item>
                </Form>
                
  ### when not found component for invalid url it will redirect to component NOTFOUND (done)
  ### resource allocate in assets folder:
  
            use in component:
            - import [image-name] from 'url';
            <img src={image-name}
            
            example:
            
            
            import React, { Component } from "react";
            import './booking-history.scss';
            import image1 from './../../assets/image1.jpg';
            
            class BookingHistory extends Component {
                render() {
                    return (
                        <h1>
                            <img src={image1} width="200" height="200" alt="image1" />
                        </h1>
                    );
                }
            }
            
            export default BookingHistory;

  
 



