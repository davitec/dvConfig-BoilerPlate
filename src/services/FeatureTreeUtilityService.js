app.service('FeatureTreeService',
    function(){
        var FeatureTreeUtility = this;

        /**
         * Executes a recursive search for fully qualifed name within product model
         * Perfomres search within Features, Features in Groups, Int and Enum Attributes
         * Recursively loops through Features
         *
         * @param f
         * @param fqn
         * @returns Object or null
         */
        this.doRecursiveSearch = function(f,fqn){

            //console.log("FQN: ", fqn);
            //console.log("Fobj:", f);
            var indx = 0,gindx = 0,findx = 0;

            if (typeof f.fqn !== 'undefined'){
                //console.log(fqn);
                if (f.fqn === fqn) {
                    //console.log(f,fqn);
                    return f;
                }
            }

            if (typeof f.features !== 'undefined'){
                for(indx = 0; indx< f.features.length; ++indx){
                    var ret = this.doRecursiveSearch(f.features[indx],fqn);
                    if (ret != null) {return ret;}
                }
            }

            if (typeof f.groups !== 'undefined'){
                for (gindx = 0; gindx < f.groups.length; ++gindx) {
                    if (typeof f.groups[gindx].features !== 'undefined') {
                        for (findx = 0; findx < f.groups[gindx].features.length; ++findx) {
                            //if (f.groups[gindx].features[findx].confstate === 'undefined') {
                            var ret = this.doRecursiveSearch(f.groups[gindx].features[findx], fqn);
                            if (ret != null) {return ret;}
                            //}
                        }
                    }
                }
            }

            if (typeof f.int !== 'undefined'){
                for(indx = 0; indx< f.int.length; ++indx){
                    var ret = this.doRecursiveSearch(f.int[indx],fqn);
                    if (ret != null) {return ret;}
                }
            }

            if (typeof f.enum !== 'undefined'){
                for(indx = 0; indx< f.enum.length; ++indx){
                    var ret = this.doRecursiveSearch(f.enum[indx],fqn);
                    if (ret != null) {return ret;}
                }
            }

        };

        /**
         * returns the first selected feature of a feature group
         *
         * @param f feature
         * @param gindx n-th group in f
         */
        this.getFirstSelectedFeatureOfGroup = function(f,gindx){
            //console.log("gfsfog", f);
            if (typeof f === 'undefined') return null;
            if (typeof f.groups === 'undefined') return null;
            if (typeof gindx === 'undefined') gindx = 0;
            if (typeof f.groups[gindx] === 'undefined') return null;

            var indx = 0;
            for (indx = 0; indx <= f.groups[gindx].features.length; indx++){
                if (typeof f.groups[gindx].features[indx] !== 'undefined'){
                    if (f.groups[gindx].features[indx].isSelected) return f.groups[gindx].features[indx];
                }
            }
            return null;
        };

        return{
            'FeatureTreeUtility' : FeatureTreeUtility
        };
    });
