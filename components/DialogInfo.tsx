/* eslint-disable react/no-unescaped-entities */
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
            Benvingut a <span className="font-bold">atbcn</span>. Agenda
            d'esdeveniments culturals de Barcelona. Aquí podràs descobrir i
            compartir informació d'esdeveniments culturals a Barcelona i
            rodalies.
            <br />
            <br />
            Pots veure info dels esdeveniments a partir de la setmana actual.
            Veuràs els esdeveniments apilats, si vols veure més info clica
            damunt de l'esdeveniment que t'interessi. Si vols afegir un
            esdeveniment hauràs de registrar-te (és molt senzill si uses Gmail).
            Que siguin esdeveniments alternatius, contraculturals,
            experimentals, etc. (cursos, tallers i similars queden exclosos).
            <br />
            <br />
            En introduir un esdeveniment, tingues en compte que alguns camps del
            formulari tenen una limitació de caràcters. Aquesta restricció
            s'implementa per a garantir la correcta visualització de la
            informació. Si necessites agregar més detalls, et recomanem incloure
            un enllaç que dirigeixi a una pàgina amb la informació completa de
            l'esdeveniment.
            <br />
            <br />
            Si tens qualsevol dubte, problema o suggeriment pots escriure a{" "}
            <span className="font-bold">atbcnapp@gmail.com</span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
