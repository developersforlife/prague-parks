import React, { useRef } from "react";

interface Footer {
  setLang: (lang: string) => void;
  lang: any;
  setApiKey: (key: any) => void;
  setInit: (flag: boolean) => void;
}
export default (props: Footer) => {
  const cs = () => props.setLang("CS");
  const en = () => props.setLang("EN");
  const { lang } = props;
  const inputRef = useRef<any>(null);

  const setApiKey = () => {
    props.setInit(false);
    props.setApiKey(inputRef.current.value ? inputRef.current.value : false);
  };
  return (
    <footer>
      <nav className="apiform">
        <div className="CSEN1">
          {lang.APIKey}:
          <input ref={inputRef} />
          <button onClick={setApiKey}>{lang.use}</button>
        </div>

        <div className="CSEN">
          {" "}
          <span onClick={cs}>CS</span> / <span onClick={en}>EN</span>
        </div>
      </nav>
    </footer>
  );
};
