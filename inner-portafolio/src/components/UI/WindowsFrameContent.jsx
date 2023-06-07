import IconInsideFolder from './IconInsideFolder';
import { contentFoldersCV, contentFolderProjects, contentFoldersCertifications } from '../../util/ContentFolders';

import classes from './WindowsFrameContent.module.css';

const WindowsFrameContent = props => {
  let content = [];
  if(props.type === 'CV & Summary'){
    content = contentFoldersCV;
  }

  if(props.type === 'Certifications'){
    content = contentFoldersCertifications;
  }

  if(props.type === 'Projects'){
    content = contentFolderProjects;
  }

  return <div className={props.className}>
    <ul className={classes['grid-container']}>
      {content.map(item => <li key={item.title}>{<IconInsideFolder image={item.logo} title={item.title} filetype={item.filetype} size={item.size} file={item.file} url={item.url} content={item.content}/>}</li>)}
    </ul>
  </div>
}

export default WindowsFrameContent;