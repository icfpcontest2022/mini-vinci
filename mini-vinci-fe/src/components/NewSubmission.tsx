import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextareaAutosize,
  Theme,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useEffect, useState } from 'react';
import { DropzoneArea } from 'react-mui-dropzone';
import { toast } from 'material-react-toastify';
import { useRecoilValue } from 'recoil';
import { authToken as authTokenAtom } from '../atoms/auth';
import { sharedColors } from '../utilities/styles';
import Loading from './Loading';
import { makeNewSubmission } from '../services/submission';

interface NewSubmissionProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const NewSubmission = (props: NewSubmissionProps): JSX.Element => {
  const { classes } = useStyles();

  const authToken = useRecoilValue(authTokenAtom);

  const [loading, setLoading] = useState(false);
  const [submittedFile, setSubmittedFile] = useState<File | null>(null);
  const [codeToSubmit, setCodeToSubmit] = useState('');

  useEffect(() => {
    if (submittedFile) {
      const reader = new FileReader();
      reader.readAsText(submittedFile);
      reader.onload = () => setCodeToSubmit(reader.result as string);
      reader.onerror = () => toast.error('Could not read the uploaded file');
    } else {
      setCodeToSubmit('');
    }
  }, [submittedFile]);

  const handleUploadFile = (fileList: File[]) => setSubmittedFile(fileList[0]);
  const handleChangeCodeToSubmit = (e: any) =>
    setCodeToSubmit(e.target.value as string);
  const handleSubmit = () => {
    setLoading(true);
    makeNewSubmission(codeToSubmit, authToken!)
      .then(props.onSubmit)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <Loading open={loading} />
      <DialogTitle>New Submission</DialogTitle>
      <DialogContent>
        <Box component='div' className={classes.contentWrapper}>
          <FormControl
            component='fieldset'
            className={classes.dropzoneContainer}
          >
            <DropzoneArea
              dropzoneClass={classes.dropzone}
              filesLimit={1}
              showFileNames
              onChange={handleUploadFile}
            />
          </FormControl>
          <TextareaAutosize
            placeholder='Code to be submitted'
            value={codeToSubmit}
            onChange={handleChangeCodeToSubmit}
            className={classes.textArea}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={handleSubmit}
          disabled={codeToSubmit === ''}
        >
          Submit
        </Button>
        <Button color='primary' onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles()((theme: Theme) => ({
  contentWrapper: {
    padding: theme.spacing(1),
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dropzoneContainer: {
    display: 'flex',
    marginRight: 'auto',
    marginLeft: 'auto',
    flexGrow: 1,
  },
  dropzone: {
    position: 'relative',
    padding: theme.spacing(2),
    minHeight: '100px',
    backgroundColor: sharedColors.gray2,
    border: 'dashed',
    borderColor: sharedColors.gray3,
    cursor: 'pointer',
  },
  textArea: {
    marginTop: theme.spacing(1.5),
    flexGrow: 1,
    display: 'flex',
    minHeight: 50,
  },
}));

export default NewSubmission;