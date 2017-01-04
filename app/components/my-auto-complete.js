import MyAutoComplete from 'ember-cli-auto-complete/components/auto-complete';
 
export default MyAutoComplete.extend({
  valueProperty: "code",
  suggestions: function() {
      var inputVal = this.get("inputVal") || "";
      return this.get("options").filter(function(item) {
          var text = item.get("code") +  item.get("text");
          return text.toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
      });
  }.property("inputVal", "options.@each"),
  optionsToMatch: function() {
      var caseInsensitiveOptions = [];
      this.get("options").forEach(function(item) {
          var value = item.get("text");
          caseInsensitiveOptions.push(value);
          caseInsensitiveOptions.push(value.toLowerCase());
      });
      return caseInsensitiveOptions;
  }.property("options.@each")
});