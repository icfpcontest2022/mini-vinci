
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Step,
  StepLabel,
  Stepper,
  TextareaAutosize,
  Theme,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HelpIcon from '@mui/icons-material/Help';
import { makeStyles } from 'tss-react/mui';
import { useEffect, useRef, useState } from 'react';
import { DropzoneArea } from 'react-mui-dropzone';
import { toast } from 'material-react-toastify';
import { useRecoilValue } from 'recoil';
<<<<<<< HEAD:mini-vinci-fe/src/components/NewSubmission.tsx
import { authToken as authTokenAtom } from '../atoms/auth';
import { sharedColors } from '../utilities/styles';
import Loading from './Loading';
import { makeNewSubmission } from '../services/submission';
import { getPreviewImageName } from '../utilities/submission';
import { Interpreter, InterpreterError } from '../contest-logic/Interpreter';
import { Canvas } from '../contest-logic/Canvas';
import { Painter } from '../contest-logic/Painter';
import { RGBA } from '../contest-logic/Color';
=======
import { authToken as authTokenAtom } from '../../../atoms/auth';
import { sharedColors } from '../../../utilities/styles';
import Loading from '../../Loading';
import { makeNewSubmission } from '../../../services/submission';
import { getPreviewImageName } from '../../../utilities/submission';
import { Interpreter } from '../../../contest-logic/Interpreter';
import { Frame } from '../../../contest-logic/Image';
import { Rgba } from '../../../contest-logic/Rgba';
>>>>>>> 8d42d973a623e398de2092cc3428beb6168fb6ff:mini-vinci-fe/src/components/pages/dashboard/NewSubmission.tsx

interface NewSubmissionProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

enum SubmissionPhase {
  ENTER_CODE,
  TYPE_CHECK,
  READY_TO_SUBMIT,
  RENDER,
  UPLOAD,
}

const NewSubmission = (props: NewSubmissionProps): JSX.Element => {
  const { classes } = useStyles();

  const authToken = useRecoilValue(authTokenAtom);

  const [loading, setLoading] = useState(false);
  const [submittedFile, setSubmittedFile] = useState<File | null>(null);
  const [codeToSubmit, setCodeToSubmit] = useState('');
  const [submissionPhase, setSubmissionPhase] = useState(
    SubmissionPhase.ENTER_CODE,
  );
  const [isRendered, setIsRendered] = useState(false);
  const [proposedScore, setProposedScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const interpret = (fileContent: string) => {
    const interpreter = new Interpreter();
    const interpretedStructure = interpreter.run(fileContent);
    if (interpretedStructure.typ === 'error') {
      const { lineNumber, error } = interpretedStructure.result as InterpreterError;
      throw Error(`[${error} at ${lineNumber}`);
    }
    return interpretedStructure.result as Canvas;
  };
  
  const drawToCanvas = (fileContent: string) => {
    const interpretedCanvas = interpret(fileContent);
    const painter = new Painter();
    const renderedData = painter.draw(interpretedCanvas);
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    canvas.width = 100;
    canvas.height = 100;

    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    renderedData.forEach((pixel: RGBA, index: number) => {
      imgData.data[index * 4] = pixel.r;
      imgData.data[index * 4 + 1] = pixel.g;
      imgData.data[index * 4 + 2] = pixel.b;
      imgData.data[index * 4 + 3] = pixel.a;
    });
    context.putImageData(imgData, 0, 0);

    // TODO: This should be replaced with the actual score
    return 31;
  };

  useEffect(() => {
    setIsRendered(false);
    setSubmissionPhase(SubmissionPhase.ENTER_CODE);
  }, [props.open]);

  useEffect(() => {
    if (submittedFile) {
      const reader = new FileReader();
      reader.readAsText(submittedFile);
      reader.onload = () => {
        setCodeToSubmit(reader.result as string);
      };
      reader.onerror = () => toast.error('Could not read the uploaded file');
    } else {
      setCodeToSubmit('');
    }
  }, [submittedFile]);

  const handleUploadFile = (fileList: File[]) => setSubmittedFile(fileList[0]);
  const handleChangeCodeToSubmit = (e: any) => {
    setCodeToSubmit(e.target.value as string);
    setSubmissionPhase(SubmissionPhase.ENTER_CODE);
    setIsRendered(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    makeNewSubmission(codeToSubmit, authToken!)
      .then(props.onSubmit)
      .catch((err) => {
        toast.error(err.message);
        setSubmissionPhase(SubmissionPhase.READY_TO_SUBMIT);
      })
      .finally(() => setLoading(false));
  };
  const handlePreview = () => {
    setLoading(true);
    setSubmissionPhase(SubmissionPhase.RENDER);
    setIsRendered(true);
    setTimeout(() => {
      try {
        setProposedScore(drawToCanvas(codeToSubmit));
        setSubmissionPhase(SubmissionPhase.READY_TO_SUBMIT);
      } catch (err: any) {
        toast.error(err.message);
        setSubmissionPhase(SubmissionPhase.ENTER_CODE);
        setIsRendered(false);
      } finally {
        setLoading(false);
      }
    }, 500);
  };
  const handleTypeCheck = async () =>
    new Promise((resolve) => setTimeout(resolve, 1000));

  const handleDownloadCanvas = () => {
    const canvas = canvasRef.current!;
    const link = document.createElement('a');
    link.download = getPreviewImageName();
    link.href = canvas.toDataURL();
    link.click();
  };

  const getRenderIcon = () => {
    if (submissionPhase === SubmissionPhase.RENDER) {
      return (
        <HourglassEmptyIcon
          style={{
            fontSize: 28,
            color: sharedColors.stepIconDisabled,
          }}
          className={classes.stepIcon}
        />
      );
    }
    return isRendered ? (
      <CheckCircleIcon
        style={{
          fontSize: 28,
          color: sharedColors.statusGreen,
        }}
        className={classes.stepIcon}
      />
    ) : (
      <HelpIcon
        style={{
          fontSize: 28,
          color: sharedColors.stepIconDisabled,
        }}
        className={classes.stepIcon}
      />
    );
  };

  const getNextButtonByPhase = () => {
    switch (submissionPhase) {
      case SubmissionPhase.ENTER_CODE:
        return (
          <Button
            color='primary'
            onClick={() => {
              setLoading(true);
              setSubmissionPhase(SubmissionPhase.TYPE_CHECK);
              handleTypeCheck()
                .then(() => {
                  setSubmissionPhase(SubmissionPhase.READY_TO_SUBMIT);
                  setIsRendered(false);
                })
                .catch((err) => toast.error(err.message))
                .finally(() => setLoading(false));
            }}
            disabled={codeToSubmit === ''}
          >
            Next
          </Button>
        );
      case SubmissionPhase.READY_TO_SUBMIT:
        return (
          <Button
            color='primary'
            onClick={() => {
              setSubmissionPhase(SubmissionPhase.UPLOAD);
              handleSubmit();
            }}
          >
            Submit
          </Button>
        );
      default:
        return (
          <Button color='primary' disabled>
            Next
          </Button>
        );
    }
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
          <Box component='div' className={classes.stepperContainer}>
            <Stepper activeStep={submissionPhase} alternativeLabel>
              <Step>
                <StepLabel>Enter Code</StepLabel>
              </Step>
              <Step>
                <StepLabel>Type Check</StepLabel>
              </Step>
              <Step>
                <StepLabel>Ready To Submit</StepLabel>
              </Step>
              <Step>
                <StepLabel icon={getRenderIcon()}>
                  Rendering
                  <br />
                  (Optional)
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>Uploading</StepLabel>
              </Step>
            </Stepper>
          </Box>
          {isRendered && (
            <Box component='div'>
              <Box component='div' className={classes.canvasContainer}>
                <canvas ref={canvasRef} />
              </Box>
              <Box component='div' className={classes.row}>
                <Box component='div' className={classes.scoreLabel}>
                  Proposed Score:
                </Box>
                <Box component='div' className={classes.scoreValue}>
                  {proposedScore}
                </Box>
                <Box component='div' className={classes.horizontalSpacer} />
                <Button
                  color='primary'
                  onClick={handleDownloadCanvas}
                  endIcon={<DownloadIcon />}
                >
                  Download
                </Button>
              </Box>
            </Box>
          )}
          <TextareaAutosize
            placeholder='Code to be submitted'
            disabled={
              submissionPhase !== SubmissionPhase.ENTER_CODE &&
              submissionPhase !== SubmissionPhase.READY_TO_SUBMIT
            }
            value={codeToSubmit}
            onChange={handleChangeCodeToSubmit}
            className={classes.textArea}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={props.onClose}>
          Close
        </Button>
        {submissionPhase === SubmissionPhase.READY_TO_SUBMIT && !isRendered && (
          <Button color='primary' onClick={handlePreview}>
            Preview
          </Button>
        )}
        {getNextButtonByPhase()}
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
  canvasContainer: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 500,
    maxHeight: 500,
    border: 'groove',
  },
  stepperContainer: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    flexGrow: 1,
  },
  stepIcon: {
    marginTop: theme.spacing(-0.25),
    marginBottom: theme.spacing(-0.25),
  },
  textArea: {
    marginTop: theme.spacing(1.5),
    flexGrow: 1,
    display: 'flex',
    minHeight: 50,
  },
  row: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
  },
  scoreLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '16px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  scoreValue: {
    marginLeft: theme.spacing(1),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '16px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  horizontalSpacer: {
    flexGrow: 1,
  },
}));

export default NewSubmission;
