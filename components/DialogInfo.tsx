import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsInfoSquareFill } from "react-icons/bs";

export function DialogInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BsInfoSquareFill className="text-card w-6 h-6 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black">
        <DialogHeader className="">
          <DialogDescription className="text-black dark:text-glow">
            Bienvenid@ a <span className="font-bold">atbcn</span>. Agenda de
            eventos culturales de Barcelona. Aquí podrás descubrir y compartir
            información de eventos culturales en Barcelona y alrededores.
            <br />
            <br />
            Puedes ver info de los eventos a partir de la semana actual. Verás
            los eventos apilados, si quieres ver más info clica encima del
            evento que te interese. Si quieres añadir un evento tendrás que
            registrarte (es muy sencillo si usas Gmail). Que sean eventos
            alternativos, contraculturales, experimentales, etc.(cursos,
            talleres, etc. quedan excluidos).
            <br />
            <br />
            Al introducir un evento, ten en cuenta que algunos campos del
            formulario tienen una limitación de caracteres. Esta restricción se
            implementa para garantizar la correcta visualización de la
            información. Si necesitas agregar más detalles, te recomendamos
            incluir un enlace que dirija a una página con la información
            completa del evento.
            <br />
            <br />
            Si tienes cualquier duda, problema o sugerencia puedes escribir a{" "}
            <span className="font-bold">atbcnapp@gmail.com</span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
