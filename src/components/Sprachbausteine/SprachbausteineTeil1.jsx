import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAnswer } from "../../redux/examSlice";
import { sprachbausteineData } from "../../data.js";
import "./Sprachbausteine.css";

const SprachbausteineTeil1 = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="info-box">
        Lesen Sie die Überschriften a–j und die Texte 1–5 und entscheiden Sie,
        welche Überschrift am besten zu welchem Text passt.
      </div>
      <div className="sp1-container">
        <p id="paragraph">
          Sehr geehrte Frau Szabo, vielen Dank für Ihr Interesse an unseren
          Deutschkursen.{" "}
          <select className="sp1-select" data-correct-word="anbei">
            <option value="">Select...</option>
            <option value="anbei">anbei</option>
            <option value="dabei">dabei</option>
            <option value="vorbei">vorbei</option>
          </select>{" "}
          erhalten Sie das angeforderte Anmeldeformular, das Sie bitte
          ausgefüllt an uns zurückschicken. Mit der Anmeldung überweisen Sie
          bitte eine Anzahlung{" "}
          <select className="sp1-select" data-correct-word="in Höhe">
            <option value="">Select...</option>
            <option value="in betrag">in betrag</option>
            <option value="in Höhe">in Höhe</option>
            <option value="in summe">in summe</option>
          </select>{" "}
          von € 200,- auf unser Konto. Die Kontoverbindung finden Sie unten auf
          dem Anmeldeformular{" "}
          <select className="sp1-select" data-correct-word="zur">
            <option value="">Select...</option>
            <option value="für">für</option>
            <option value="zur">zur</option>
            <option value="zwek">zwek</option>
          </select>{" "}
          genaueren Einschätzung Ihrer Vorkenntnisse haben wir einen
          Einstufungstest beigelegt. Wenn Sie die Tetsbögen ausfüllen und mit
          der Anmeldung an uns zurücksenden, helfen Sie uns bei der Kursplanung.
          Ein mündlicher Test wird sich am ersten Unterrichtstag in unserer
          Schule auch ein mündlicher Test{" "}
          <select className="sp1-select" data-correct-word="stattfinden">
            <option value="">Select...</option>
            <option value="durchführen">durchführen</option>
            <option value="stattfinden">stattfinden</option>
            <option value="veranstalten">veranstalten</option>
          </select>
          . Damit sind wir in der Lage, den für Sie angemessenen Kurs
          auszuwählen. Außerdem finden Sie in den Unterlagen einen Fragebogen{" "}
          <select className="sp1-select" data-correct-word="bezüglich">
            <option value="">Select...</option>
            <option value="anlässlich">anlässlich</option>
            <option value="bezüglich">bezüglich</option>
            <option value="mittels">mittels</option>
          </select>{" "}
          Ihrer Freizeitinteressen, denn wir werden uns bemühen, Ihnen
          Aufenthalt in Leipzig{" "}
          <select className="sp1-select" data-correct-word="möglichst">
            <option value="">Select...</option>
            <option value="möglich">möglich</option>
            <option value="möglichrweise">möglichrweise</option>
            <option value="möglichst">möglichst</option>
          </select>{" "}
          angenehm zu gestalten. Schließlich füllen Sie bitte das grüne
          Unterkunftblatt aus. Sie können wählen zwischen einem 3-Sterne-Hotel,{" "}
          <select className="sp1-select" data-correct-word="einer">
            <option value="">Select...</option>
            <option value="ein">ein</option>
            <option value="einem">einem</option>
            <option value="einer">einer</option>
          </select>{" "}
          Privatunterkunft in einer deutschen Gastfamilie oder der Unterkunft in
          einem Studentenwohnheim. Letzteres ist nur in den Semesterferien der
          Universität - in der Regel vom 15.2. bis 15.4. und vom 15.7. bis
          15.10. - möglich. Geben Sie bitte auch Ihre Verpflegungswünsche -
          Frühstück oder Halbpension - an. Beachten Sie aber, dass im
          Studentenwohnheim nur Selbstverpflegung möglich ist.{" "}
          <select className="sp1-select" data-correct-word="Sobald">
            <option value="">Select...</option>
            <option value="Sobald">Sobald</option>
            <option value="Sofort">Sofort</option>
            <option value="Sooft">Sooft</option>
          </select>{" "}
          Ihre Anmeldung bei uns eingegangen ist, erhalten Sie eine
          Anmeldebestätigung und einen Stadtplan mit Wegbeschreibung.
          <select className="sp1-select" data-correct-word="damit">
            <option value="">Select...</option>
            <option value="dafür">dafür</option>
            <option value="damit">damit</option>
            <option value="dazu">dazu</option>
          </select>{" "}
          Sie den Weg zu uns ohne Umstände finden. Die Adresse ihrer Unterkunft
          erhalten Sie ca. 2 Wochen vor Kursbeginn{" "}
          <select className="sp1-select" data-correct-word="Für">
            <option value="">Select...</option>
            <option value="bei">bei</option>
            <option value="Für">Für</option>
            <option value="Zu">Zu</option>
          </select>{" "}
          weitere Fragen steht Ihnen unser Sekretariat gerne montags bis
          freitags von 8 bis 18 Uhr zur Verfügung. Mit freundlichen Grüßen
          Gerhard Dietz Direktor
        </p>
      </div>
    </>
  );
};

export default SprachbausteineTeil1;
