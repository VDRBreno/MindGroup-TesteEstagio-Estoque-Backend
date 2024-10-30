import { Response } from 'express';
import colorout from './colorout';

export class FormattedExpressError {

  public error: any;
  public description: string;
  public status: number;

  constructor(props: FormattedExpressError) {
    this.error = props.error;
    this.description = props.description;
    this.status = props.status;
  }

}

interface HandleExpressErrorProps {
  error: any;
  response: Response;
}
export default function HandleExpressError({
  error,
  response
}: HandleExpressErrorProps) {

  const date = new Date().toISOString();
  console.log();
  console.error(colorout('fg.red', '> HandleExpressError'));
  console.error(colorout('fg.red', date));

  if(error instanceof FormattedExpressError) {

    console.error(colorout('fg.red', 'FULL ERROR'));
    console.error(error);
    console.error(colorout('fg.red', 'EXPRESS FORMATTED ERROR'));
    console.error(colorout('fg.red', 'MESSAGE'));
    console.error(error.description);
    console.error(colorout('fg.red', 'ERROR'));
    console.error(error.error.stack ?? error.error);

    response.status(error.status).send({ error_description: error.description });
    
  } else if (error instanceof Error) {

    if(error.stack) {
      console.error(colorout('fg.red', 'FULL ERROR'));
      console.error(error);
    }
    console.error(colorout('fg.red', 'INSTANCE ERROR'));
    console.error(colorout('fg.red', 'MESSAGE'));
    console.error(error.message);
    console.error(colorout('fg.red', 'ERROR'));
    console.error(error.stack ?? error);

    response.status(500).send({ error_description: 'Ocorreu um erro inesperado' });

  } else {

    console.error(colorout('fg.red', 'ANY ERROR'));
    console.error(error);

    response.status(500).send({ error_description: 'Ocorreu um erro inesperado' });
    
  }
  
  console.log();

}