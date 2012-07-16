describe("typewriter", function() {

  var typewriter;

  beforeEach(function() {
      typewriter = new Typewriter();
  });

  it("should be initialized on load", function() {
      expect(typewriter.isInitialized()).toEqual(true);
  });

});