
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

import { useApi } from '@/hooks/useApi';
import { Role } from '@/types';
import { api } from '@/lib/api';

const AddPersonModal: React.FC<AddPersonModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { data: roles, loading: rolesLoading } = useApi<Role[]>('/roles/');
  const { data: branches, loading: branchesLoading } = useApi<any[]>('/branches/');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [role, setRole] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [iban, setIban] = React.useState('');
  const [city, setCity] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [investedIn, setInvestedIn] = React.useState('');
  const [investmentDate, setInvestmentDate] = React.useState<Date | null>(null);
  const [sharePercentage, setSharePercentage] = React.useState('');
  const [investmentAmount, setInvestmentAmount] = React.useState('');
  const [contract, setContract] = React.useState('');
  const [promissoryNote, setPromissoryNote] = React.useState('');
  const [receipt, setReceipt] = React.useState<File | null>(null);
  const [note, setNote] = React.useState('');
  const [profilePicture, setProfilePicture] = React.useState<File | null>(null);
  const [branch, setBranch] = React.useState('');

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    console.log('role', role);
    console.log('branch', branch);
    const formData = new FormData();
    formData.append('full_name', `${name} ${surname}`);
    formData.append('role', role);
    if (branch) {
      formData.append('branch', branch);
    }
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('iban', iban);
    formData.append('address', address);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }
    if (receipt) {
      formData.append('receipt', receipt);
    }
    formData.append('note', note);

    if (role === investorRole?.id) {
      formData.append('invested_in', investedIn);
      if(investmentDate) {
        formData.append('investment_date', investmentDate.toISOString());
      }
      formData.append('share_percentage', sharePercentage);
      formData.append('investment_amount', investmentAmount);
    }

    try {
      await api.post('/people/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  const investorRole = roles?.find((r) => r.name === 'investor');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" className="dark" backdrop="blur">
      <ModalContent className="bg-gray-800">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Kişi Ekle</ModalHeader>
            <ModalBody>
              <div className="flex gap-8">
                <div className="w-1/4 flex flex-col items-center">
                  <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    {profilePicture ? (
                      <img src={URL.createObjectURL(profilePicture)} alt="Profil Fotoğrafı" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <Button as="label" htmlFor="profile-picture-upload" variant="light" className="cursor-pointer">
                    Profil Fotoğrafı Yükle
                    <input id="profile-picture-upload" type="file" className="hidden" onChange={handleProfilePictureChange} />
                  </Button>
                </div>
                <div className="w-3/4">
                                    <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                      <Input label="İsim" placeholder="İsim giriniz" value={name} onChange={(e) => setName(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }} />
                                    </div>
                                    <div className="flex flex-col">
                                      <Input label="Soyisim" placeholder="Soyisim giriniz" value={surname} onChange={(e) => setSurname(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }} />
                                    </div>
                                    <div className="flex flex-col">
                                      <Select label="Rol Seçin" placeholder="Rol seçiniz" value={role} onChange={(e) => setRole(e.target.value)} isLoading={rolesLoading} labelPlacement="outside" classNames={{ label: 'mb-1', trigger: 'bg-gray-700', popoverContent: 'bg-gray-800' }}>
                                        {roles ? (
                                          roles.map((role) => (
                                            <SelectItem key={role.id} value={role.id}>
                                              {role.display_name}
                                            </SelectItem>
                                          ))
                                        ) : (
                                          <SelectItem key="no-roles" value="no-roles" isDisabled>Roller yüklenemedi</SelectItem>
                                        )}
                                      </Select>
                                    </div>
                                    <div className="flex flex-col">
                                      <Input label="Mail" placeholder="Mail adresi giriniz" type="email" value={email} onChange={(e) => setEmail(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }} />
                                    </div>
                                      {role && investorRole && role === investorRole.id && (
                                        <div className="flex flex-col">
                                          <Select label="Şube" placeholder="Şube seçiniz" value={branch} onChange={(e) => setBranch(e.target.value)} isLoading={branchesLoading} labelPlacement="outside" classNames={{ label: 'mb-1', trigger: 'bg-gray-700', popoverContent: 'bg-gray-800' }}>
                                            {branches ? (
                                              branches.map((branch) => (
                                                <SelectItem key={branch.id} value={branch.id}>
                                                  {branch.name}
                                                </SelectItem>
                                              ))
                                            ) : (
                                              <SelectItem key="no-branches" value="no-branches" isDisabled>Şubeler yüklenemedi</SelectItem>
                                            )}
                                          </Select>
                                        </div>
                                      )}
                                    <div className="flex flex-col">
                                      <Input 
                                        label="Telefon"
                                        placeholder="+90 555 555 55 55"
                                        value={phone}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          if (value.startsWith('+90')) {
                                            setPhone(value);
                                          } else {
                                            setPhone('+90' + value.replace(/[^0-9]/g, ''));
                                          }
                                        }}
                                        labelPlacement="outside"
                                        classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }}
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <Input 
                                        label="IBAN"
                                        placeholder="TR..."
                                        value={iban}
                                        onChange={(e) => {
                                          const value = e.target.value.replace(/[^0-9]/g, '');
                                          let formattedIban = 'TR';
                                          if (value.length > 0) {
                                            formattedIban += ' ' + value.substring(0, 22).match(/.{1,4}/g)?.join(' ');
                                          }
                                          setIban(formattedIban.trim());
                                        }}
                                        labelPlacement="outside"
                                        classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }}
                                      />
                                    </div>                                    </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Adres Bilgileri</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <Select label="Şehir" placeholder="Şehir seçiniz" value={city} onChange={(e) => setCity(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', trigger: 'bg-gray-700', popoverContent: 'bg-gray-800' }}>
                          <SelectItem key="istanbul" value="istanbul">İstanbul</SelectItem>
                        </Select>
                      </div>
                      <div className="flex flex-col">
                        <Select label="Mahalle" placeholder="Mahalle seçiniz" value={district} onChange={(e) => setDistrict(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', trigger: 'bg-gray-700', popoverContent: 'bg-gray-800' }}>
                          <SelectItem key="kadikoy" value="kadikoy">Kadıköy</SelectItem>
                        </Select>
                      </div>
                      <div className="flex flex-col">
                        <Select label="Sokak" placeholder="Sokak seçiniz" value={street} onChange={(e) => setStreet(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', trigger: 'bg-gray-700', popoverContent: 'bg-gray-800' }}>
                          <SelectItem key="bahariye" value="bahariye">Bahariye</SelectItem>
                        </Select>
                      </div>
                      <div className="flex flex-col">
                        <Input label="Açık Adres" placeholder="Açık adres giriniz" value={address} onChange={(e) => setAddress(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }} />
                      </div>
                    </div>
                  </div>

                  {role === investorRole?.id && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">Yatırım Bilgileri</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <Select label="Yatırım Yaptığı Yer" placeholder="Şube seçiniz" value={investedIn} onChange={(e) => setInvestedIn(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', trigger: 'bg-gray-700', popoverContent: 'bg-gray-800' }}>
                            <SelectItem key="branch1" value="branch1">Şube 1</SelectItem>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <Input type="date" label="Yatırım Tarihi" placeholder="Tarih seçiniz" value={investmentDate ? investmentDate.toISOString().split('T')[0] : ''} onChange={(e) => setInvestmentDate(new Date(e.target.value))} labelPlacement="outside" classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }} />
                        </div>
                        <div className="flex flex-col">
                          <Input 
                            label="Hisse Oranı"
                            placeholder="Hisse oranı giriniz"
                            value={sharePercentage}
                            onChange={(e) => setSharePercentage(e.target.value)}
                            endContent="%"
                            labelPlacement="outside"
                            classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <Input 
                            label="Yatırım Tutarı"
                            placeholder="Tutar giriniz"
                            value={investmentAmount}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              const formattedValue = new Intl.NumberFormat('tr-TR').format(Number(value));
                              setInvestmentAmount(formattedValue);
                            }}
                            labelPlacement="outside"
                            classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }}
                          />
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold">Aylık Kazanç = </span>
                          <span className="text-lg font-semibold ml-2">xxx.xxx ₺</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Belgeler</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <Select label="Sözleşme Seç" placeholder="Sözleşme seçiniz" value={contract} onChange={(e) => setContract(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', trigger: 'bg-gray-700', popoverContent: 'bg-gray-800' }}>
                          <SelectItem key="contract1" value="contract1">Sözleşme 1</SelectItem>
                        </Select>
                      </div>
                      {contract && <Button onPress={() => console.log('Sözleşme Oluştur')}>Sözleşme Oluştur</Button>}
                      <div className="flex flex-col">
                        <Select label="Senet Seç" placeholder="Senet seçiniz" value={promissoryNote} onChange={(e) => setPromissoryNote(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', trigger: 'bg-gray-700', popoverContent: 'bg-gray-800' }}>
                          <SelectItem key="note1" value="note1">Senet 1</SelectItem>
                        </Select>
                      </div>
                      {promissoryNote && <Button onPress={() => console.log('Senet Oluştur')}>Senet Oluştur</Button>}
                      <div>
                        <label htmlFor="receipt-upload" className="block text-sm font-medium text-gray-400 mb-1">Dekont Yükle</label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="receipt-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    {receipt ? (
                                      <p className="text-sm text-gray-400">{receipt.name}</p>
                                    ) : (
                                      <>
                                        <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                      </>
                                    )}
                                </div>
                                <input id="receipt-upload" type="file" className="hidden" onChange={(e) => setReceipt(e.target.files ? e.target.files[0] : null)} accept="image/*" />
                            </label>
                        </div> 
                      </div>
                      <div className="flex flex-col">
                        <Textarea label="Not" placeholder="Not ekleyiniz" value={note} onChange={(e) => setNote(e.target.value)} labelPlacement="outside" classNames={{ label: 'mb-1', inputWrapper: 'bg-gray-700' }} />
                      </div>
                    </div>
                  </div>
                                        
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Kapat
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Ekle
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );

};

export default AddPersonModal;
