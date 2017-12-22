<?php
/**
 * Created by PhpStorm.
 * User: sebastian
 * Date: 23.10.17
 * Time: 09:57
 */

if (isset($_POST["send"])){
    print $_POST["firstName"];
    $dom = new DOMDocument();

    $dom->load(realpath("mannschaftsliste_neu.xml"), LIBXML_NOBLANKS);


    $neu=$dom->createElement("player");

    $firstName=$dom->createElement("firstName");
    $lastName=$dom->createElement("lastName");
    $yob=$dom->createElement("yob");
    $birthday=$dom->createElement("birthday");
    $position=$dom->createElement("position");


    $firstNameContent=$dom->createTextNode($_POST["firstName"]);

    $lastNameContent=$dom->createTextNode($_POST["lastName"]);

    $yobContent=$dom->createTextNode($_POST["yob"]);
    $birthdayContent=$dom->createTextNode($_POST["birthday"]);
    $positionContent=$dom->createTextNode($_POST["position"]);

    $firstName->appendChild($firstNameContent);
    $lastName->appendChild($lastNameContent);
    $yob->appendChild($yobContent);

    $birthday->appendChild($birthdayContent);
    $position->appendChild($positionContent);

    //insert new element

    $wurzel=$dom->documentElement;
    $wurzel->appendChild($neu);

    $neu->appendChild($firstName);
    $neu->appendChild($lastName);
    $neu->appendChild($yob);
    $neu->appendChild($birthday);
    $neu->appendChild($position);




    //output HTML

    print "<pre>".htmlentities($dom->saveXML())."</pre>";




    //write data to file
    echo "Moin, ihr Luschen";
    echo "Wrote: ".$dom->save('mannschaftsliste_neu.xml')."bytes";


}
