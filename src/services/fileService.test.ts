import { RootState } from '../app/store';
import * as FileService from './fileService';

describe('FileService', () => {
    it('saveData produces correct FileURL', () => {
        // Arrange
        const mockData: RootState = {
            bills: {
                bills: [
                    {
                        creationDate: new Date(),
                        id: 0,
                        idsPaidOut: [1, 2, 3],
                        peopleIds: [1, 2, 3],
                        sum: 1234,
                        title: "Test title 0",
                    },
                    {
                        creationDate: new Date(),
                        id: 1,
                        idsPaidOut: [2, 3, 4],
                        peopleIds: [4, 3, 2],
                        sum: 1234,
                        title: "Test title 1",
                    },
                ]
            },
            contacts: {
                contacts: [
                    {
                        name: "Test Name 1",
                    },
                    {
                        name: "Test Name 2",
                    },
                    {
                        name: "Test Name 3",
                    },
                ]
            }
        };

        const spy = jest.spyOn(document.body, "appendChild").mockImplementation(x => x);

        const mockCreateObjectURL = jest.fn(()=>"Mock Data String");
        global.URL.createObjectURL = mockCreateObjectURL;

        // Act
        FileService.saveData(mockData);

        // Assert
        expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
        expect(spy.mock).toHaveBeenCalledTimes(1);
        expect((spy.mock.calls[0][0] as HTMLAnchorElement).href).toBe("Mock Data String");
    })
})