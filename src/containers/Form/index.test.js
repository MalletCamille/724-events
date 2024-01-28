import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      
      // On clique sur le bouton
      fireEvent.click(await screen.findByTestId("button-test-id"));

      // Pour vérifiezr que le texte "En cours" est présent (indiquant le chargement)
      await screen.findByText("En cours");

      // Pour vérifier que le texte "Envoyer" n'est plus présent
      expect(screen.queryByText("Envoyer")).not.toBeInTheDocument();

      // Pour vérifier que la fonction onSuccess a été appelée
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
