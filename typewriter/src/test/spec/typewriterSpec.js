describe("typewriter", function() {

  var typewriter;

  beforeEach(function() {
      typewriter = new Typewriter();
  });

  it("should be initialized on creation", function() {
      for( var i=0; i<typewriter.getCharacters().length; i++ ) {
          var char = typewriter.getCharacters().charAt(i);
          var status = typewriter.getStatistic(char);
          expect(status).not.toBeNull();
          expect(status.overall).toBe(0);
          expect(status.correct).toBe(0);
          expect(status.wrong).toBe(0);
          expect(status.overallTime).toBe(0);
          expect(status.maximumTime).toBeUndefined();
          expect(status.minimumTime).toBeUndefined();
      }
  });

});