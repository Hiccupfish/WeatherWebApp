// Form.js
import { Button, Form } from 'reactstrap';

function MyForm() {


    
  return (
    <Form >
      <label>Enter locationvbcbn: </label>
      <input type="text" style={{ width: '80%' }} placeholder="aaaaEnter your location to receive a weather update"/>
      <Button color="primary" style={{width:'25%'}} >Submit</Button>
    </Form>
  );
};


export default MyForm;
