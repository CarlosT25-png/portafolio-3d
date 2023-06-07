import Typewriter from 'typewriter-effect';
import StartMenuIconA from './StartMenuIconA';

import useAddWindowsFrame from '../../../util/useAddWindowsFrame';

import githubLogo from '../../../assets/github.webp';
import linkedinLogo from '../../../assets/linkedin.webp';
import emailLogo from '../../../assets/email.webp';
import pdfLogo from '../../../assets/pdf.webp';
import cmdLogo from '../../../assets/cmd.webp';
import classes from './StartMenuNetworks.module.css';

const StartMenuNetworks = (props) => {
  const { addEmailWindows, addBasicWindowsFrame } = useAddWindowsFrame();

  return (
    <div className={props.className + ' ' + classes.container}>
      <StartMenuIconA
        image={githubLogo}
        title="CarlosT25-png"
        subtitle="GitHub Profile"
        link="https://github.com/CarlosT25-png"
      />
      <StartMenuIconA
        image={linkedinLogo}
        title="Carlos Torres"
        subtitle="LiinkedIn Profile"
        link="https://www.linkedin.com/in/carlos-torres-valle/"
      />
      <div className={classes.divider}></div>
      <StartMenuIconA
        image={emailLogo}
        title="Contact Me"
        link="#"
        target=""
        onClick={addEmailWindows}
      />
      <StartMenuIconA
        image={pdfLogo}
        title="Curriculum Vitae"
        link="files/cv.pdf"
        target="_blank"
      />
      <StartMenuIconA
        image={cmdLogo}
        title="Skills"
        link="#"
        target=""
        onClick={addBasicWindowsFrame}
        content={
          <div className={classes.console}>
            Microsoft Windows XP [Version 5.1.2600] <br />
            &lt;C&gt; Copyright 1985-2001 Microsoft Corp.
            <br />
            <br />
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pasteString('C:\Documents and Settings\Carlos Torres>')
                  .typeString(' skills.bat')
                  .pauseFor(2500)
                  .start();
              }}
            />
            <Typewriter
            options={{
              cursor: ''
            }}
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(2750)
                  .pasteString(`
                  <br />
                  <div class=${classes.text}>
                    <p>ReactJS</p>
                    <p>React Native</p>
                    <p>TypeScript</p>
                    <p>NextJS</p>
                    <p>ThreeJS</p>
                    <p>React Three Fiber</p>
                    <p>AWS</p>
                    <p>Cypress</p>
                    <p>NodeJS</p>
                    <p>SQL and NoSQL Database</p>
                  </div>`)
                  .pauseFor(2750)
                  .start();
              }}
            />
          </div>
        }
      />
      <div className={classes.divider + ' ' + classes['margin-top-auto']}></div>
      <div>
        <p>All Programs</p>
        <span></span>
      </div>
    </div>
  );
};

export default StartMenuNetworks;
