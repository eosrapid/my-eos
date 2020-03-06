import React, {useState} from "react";
import classnames from "classnames";
import { privateKeyForm } from "./PrivateKeyForm.module.scss";
import LabelInput from '@/components/LabelInput';
import MEInput from '@/components/MEInput';
import MEButton from '@/components/MEButton';

const PrivateKeyForm = ({ className, onSubmit }) => {
  const [eosAcc, setEosAcc] = useState('');
  const [eosPerm, setEosPerm] = useState('active');
  const [privKey, setPrivKey] = useState('');
  console.log("EOS ACC: ",eosAcc);
  return (
    <div className={classnames(privateKeyForm, className)}>
      <LabelInput
        label="EOS Account"
      >
        <MEInput
          type="text"
          value={eosAcc}
          spellCheck="false"
          autoComplete="false"

          onChange={(e)=>{
            const v = e.target.value.toLowerCase().replace(/[^a-z|1-5]/g,"");
            e.target.value = v;
            setEosAcc(v)
          }}
          placeHolder="EOS Account Name..."
        />
      </LabelInput>
      <LabelInput
        label="EOS Account Permission"
      >
        <MEInput
          type="text"
          value={eosPerm}
          onChange={(e)=>setEosPerm(e.target.value.toLowerCase())}
          placeHolder="EOS Account Permission..."
        />
      </LabelInput>
      <LabelInput
        label="Private Key"
      >
        <MEInput
          type="text"
          value={privKey}
          onChange={(e)=>setPrivKey(e.target.value)}
          placeHolder="EOS Private Key..."
        />
      </LabelInput>
      <div className="ctrls">
        <MEButton 
          className="block fullWidth"
          onClick={()=>onSubmit({
            actor: eosAcc,
            permission: eosPerm,
            privateKey: privKey
          })}
        >Submit</MEButton>
      </div>
    </div>
  );
};

export default PrivateKeyForm;
