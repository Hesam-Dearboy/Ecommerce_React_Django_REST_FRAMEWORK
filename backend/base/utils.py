from kavenegar import *

def send_otp_code(phoneNumber, code):
    try:
        api = KavenegarAPI('564C514D4535686A5130332F695441383152697A4B3936656D6A6B6C7746644A2F6674706D416B753542343D')
        params = {
            'sender': '10008663',
            'receptor': phoneNumber ,
            'message': f'{code} کد تایید شما ',
        }
        response = api.sms_send(params)
        print(response)
    
    except APIException as e: 
        print(e)
    except HTTPException as e: 
        print(e)