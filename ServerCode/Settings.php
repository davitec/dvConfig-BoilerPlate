<?php
/**
 * Created by PhpStorm.
 * User: rschueppel
 * Date: 04.02.16
 * Time: 14:25
 */

namespace DvConfig\ServerCode;

class Settings
{
    /**
     * @var array
     */
    protected $settings;

    /*
        //"api-cli-credentials-url" => "http://192.168.178.101:8080/RestService/rest/cli-credentials",
        //"api-product-url" => "http://192.168.178.101:8080/RestService/rest/product",
        //"Apikey" => "Boilerplate_davitec_gmbh_6dfohsb5aa8m756a9dt3m92inu2vopmp8q7q42d4ei4r28cg4mb60g0bpbml1mch6pd98h21pjltfvflo9j5c30vh6n8mmd5jh54pkbiea41kgjdukosp7akssngn7o1cr3ebflve8q5uh76oh1c9e4pn01gdn9eob1oe4qau469ohpm6e4cgusp9t43n6aeou2qf2bn",
        //"Token" => "9s16361kp9n3fcv5jsnoqq8nuopb31568t24p4699k80pie3l53nontm0mqjmrev75olrtd3ckhpft1f4joc9hl5bchn9ckhve4u68vuqr0djaeja1fa661tgh31gmjp3lpbrvairfpvq816o1npilppmpksndeuo867bdhpq575t491n6t519gov12de9ncj28evtfo6temi00kunisge26b3anoen2d4b7brb50gnotn57qoai4gaepmnh9v64t0vlv8i1epj282vs64l79hqo180sv1570n87pijceg65vd5i72ghnf0mgo2lt1vkr4gg0rf22buesc86ur69oa9fovdj0gj7o73fdvbk7hkpp2s3cq2vsr2j7npfcg3kkgqnlcv6asgtra217edfj0qtq9svt1duqggaspghl24l0b0hl5j530o2rcr0gdj8d8vtrm0ihttse7482rur41daaps8nhkt723p93ss09m58u5ns44sasja6evmsf17164e86h8pg5l9knnc04uc3vdqdqcfqoqlpsepma7nfijjki8308nos0115vn19b6cu5ggi4tbicski689k0tcn0trae04i08iu65tmj934ii0r9ii7jai0rn8l2vkofp9dshsl24c938eek9kltr9j195j6l6k13q7mh6g96m1oihjokfnbf1917866r5pbbumaubpacunob08ff9jghnme0i3lel4vh2vnr781vp6tnt0me42oe7eea7trtna1ua89cvb92ajau3ee9j0ijegjl7antpfaa",

        "api-cli-credentials-url" => "http://localhost:8080/dvConfigurationService/rest/cli-credentials",
        "api-product-url" => "http://localhost:8080/dvConfigurationService/rest/product",
        "Apikey" => "BoilerPlate_davitec_gmbh_buio57ioehrvfpuv8qlr28cu12mdnpdhe3i1iflfqn0g5r4ff0fdm7gaharkncjtaarhalgq867i23dmgkb9fj3onhvh6kmdh6qte3o54jk4f3alth7vjmamoe9j9rbnhesk4b3horjegrji16vllb1pqm61m7rktj550jcamevt7usuesb7l33071rf9uabvbur8ake",
        "Token" => "o848esr7uudff73eh3von6r3e3j99ol1t5de1f2nccb98nnjdkcpjkqh8nd4ra63jqscctsfvi69bes1dtldqv9edcs9159ta2hf71mi3d7sr7uhc1qiuluenpe9hdp5fv087gdvplkmujpllima5r15orfrcg2b48i5cen5ann00csl70spmbi1pm6bhc8h4kddpur5vg0nuhvqhrteos9v8hniiiq297hqbthqi3sa72v1aq9u6g3s6d3sh81728ro2ijhkh0l1pla5bcl1cegjol4kfer5ibcan79m59tl4u8kslb6dmp84ro3a1lefhk0d1kpbr1krdav2neerivtrj9f07vffdrh3b68bhk247gkb611rvba644qqav1qoviujhjgl5dhi56gjuisl1j8uplgheikls3qsitqs0kprfuk4s6fj4bsseshit6soksm0pfup6vvtnli4vgnophd0ug5gvrf8j7abotcueipjiq27fghubgi8do0eei3q947spb6uitj8h4v63b356894efbo37pmpi47mo85qn7j7lj4ff3pt5gt1fug0ie847euh03o71tu3675a4mgblic9h9j3035nf0nu7iifcpm6ho1ek187mcrtk8mnd5s693ptcme2qid71gpr60g5qig1a436ge4mqs3skrj6npo94vceeb99erd6s6s6itardtnql1be1jdrv035t31f6iti77h9ltl1bpqofghat54phhpk796rkke4tkto6estscv2dl24mklnl7pfomq57m744rga",

        "xmlfile" => "./products/Schreibtisch.xml",
    );
    */

    function __construct(){
        $setting_string = file_get_contents('./settings_local.json');
        $this->settings = json_decode($setting_string,true);
    }

    public function getSettings(){
        return $this->settings;

    }

    public function getSetting($key){
        return (isset($this->settings[$key]))?$this->settings[$key]:null;
    }

}
